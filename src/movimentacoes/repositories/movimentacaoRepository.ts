import pool from "../../db";
import { MovimentacaoInput } from "../models/MovimentacaoInput";

export async function insertMovimentacao(movimentacao: MovimentacaoInput, client?: any): Promise<void> {
  const executor = client || pool;

  const query = `
    INSERT INTO movimentacoes_estoque (produto_variacao_id, referencia_id, data, quantidade, tipo, origem, observacao)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

  const values = [
    movimentacao.produtoVariacaoId,
    movimentacao.referenciaId,
    movimentacao.data,
    movimentacao.quantidade,
    movimentacao.tipo,
    movimentacao.origem,
    movimentacao.observacao
  ];

  await executor.query(query, values);
  return;
}