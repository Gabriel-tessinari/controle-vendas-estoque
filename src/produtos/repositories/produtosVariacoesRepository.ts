import pool from "../../db";
import { produtoVariacaoDBEmProdutoVariacaoCalculoPrecoCompra } from "../mappers/produtoVariacaoDBEmProdutoVariacaoCalculoPrecoCompra";
import { ProdutoVariacaoCalculoPrecoCompra } from "../models/ProdutoVariacaoCalculoPrecoCompra";

export async function selectEstoqueEPrecoCompraFromProdutosVariacoes(
  id: number,
  client?: any
): Promise<ProdutoVariacaoCalculoPrecoCompra> {
  const executor = client || pool;

  const query = `
    SELECT estoque, preco_compra
    FROM produtos_variacoes
    WHERE id = $1
  `;

  const res = await executor.query(query, [id]);
  return produtoVariacaoDBEmProdutoVariacaoCalculoPrecoCompra(res.rows[0]);
}

export async function updateProdutoVariacaoSetEstoqueEPrecoCompra(
  id: number,
  estoque: number,
  precoCompra: number,
  client?: any
): Promise<void> {
  const executor = client || pool;

  const query = `
    UPDATE produtos_variacoes
    SET estoque = $1, preco_compra = $2
    WHERE id = $3
  `;
  const values = [estoque, precoCompra, id];

  await executor.query(query, values);
}

export async function variacoesExistem(ids: number[], client?: any): Promise<boolean> {
  if (!ids.length) return false;

  const executor = client || pool;

  const query = `
    SELECT COUNT(*)::int AS total
    FROM produtos_variacoes
    WHERE id = ANY($1)
  `;

  const res = await executor.query(query, [ids]);
  return res.rows[0].total === ids.length;
}
