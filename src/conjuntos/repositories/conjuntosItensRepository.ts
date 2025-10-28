import pool from "../../db";
import { conjuntoItemDBEmConjuntoItem } from "../mappers/conjuntoItemDBEmConjuntoItem";
import { ConjuntoItem } from "../models/ConjuntoItem";
import { ConjuntoItemInput } from "../models/ConjuntoItemInput";

export async function insertConjuntoItem(conjuntoId: number, conjuntoItem: ConjuntoItemInput, client?: any): Promise<ConjuntoItem> {
  const executor = client || pool;

  const query = `
    INSERT INTO conjuntos_itens (conjunto_id, produto_id, quantidade)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [
    conjuntoId,
    conjuntoItem.produtoId,
    conjuntoItem.quantidade
  ];

  const resultado = await executor.query(query, values);
  return conjuntoItemDBEmConjuntoItem(resultado.rows[0]);
}