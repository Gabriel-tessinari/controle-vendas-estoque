import pool from "../../db";
import { conjuntoDBEmConjunto } from "../mappers/conjuntoDBEmConjunto";
import { Conjunto } from "../models/Conjunto";
import { ConjuntoInput } from "../models/ConjuntoInput";

export async function insertConjunto(conjunto: ConjuntoInput, client?: any): Promise<Conjunto> {
  const executor = client || pool;

  const query = `
    INSERT INTO kits (nome, descricao, preco_compra, preco_venda, ativo)
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