import pool from "../../db";
import { conjuntoDBEmConjunto } from "../mappers/conjuntoDBEmConjunto";
import { conjuntosDBEmConjuntosCatalogo } from "../mappers/conjuntosDBEmConjuntosCatalogo";
import { Conjunto } from "../models/Conjunto";
import { ConjuntoInput } from "../models/ConjuntoInput";

export async function insertConjunto(conjunto: ConjuntoInput, client?: any): Promise<Conjunto> {
  const executor = client || pool;

  const query = `
    INSERT INTO conjuntos (nome, descricao, preco_compra, preco_venda, ativo)
    VALUES ($1, $2, 0, $3, true)
    RETURNING *
  `;

  const values = [
    conjunto.nome,
    conjunto.descricao,
    conjunto.precoVenda
  ];

  const resultado = await executor.query(query, values);
  return conjuntoDBEmConjunto(resultado.rows[0]);
}

export async function selectConjuntosComItens(pesquisar: string, client?: any): Promise<Conjunto[]> {
  const executor = client || pool;
  const params: any[] = [];
  let whereClause = '';

  if (pesquisar && pesquisar.trim() !== '') {
    params.push(`%${pesquisar}%`);
    whereClause = `
      WHERE c.nome ILIKE $1
      OR c.descricao ILIKE $1
    `;
  }

  const query = `
    SELECT 
      c.id AS id,
      c.nome AS nome,
      c.descricao AS descricao,
      c.preco_venda AS preco_venda,
      c.preco_compra AS preco_compra,
      c.ativo AS ativo,
      i.id AS item_id,
      i.conjunto_id AS conjunto_id,
      i.produto_id AS produto_id,
      i.quantidade AS quantidade
    FROM conjuntos c
    LEFT JOIN conjuntos_itens i ON i.conjunto_id = c.id
    ${whereClause}
    ORDER BY c.nome ASC, c.id ASC;
  `;

  const conjuntosDB = await executor.query(query, params);

  return conjuntosDBEmConjuntosCatalogo(conjuntosDB.rows);
}
