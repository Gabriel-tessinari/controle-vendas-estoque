import pool from "../../db";
import { CompraInput } from "../models/CompraInput";
import { CompraItemInput } from "../models/CompraItemInput";
import { CompraPagamentoInput } from "../models/CompraPagamentoInput";

export async function insertCompra(compra: CompraInput, client?: any): Promise<number> {
  const executor = client || pool;

  const query = `
    INSERT INTO compras (fornecedor_id, data_compra, frete, outras_taxas, status_pagamento)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

  const values = [
    compra.fornecedorId,
    compra.dataCompra,
    compra.frete,
    compra.outrasTaxas,
    compra.statusPagamento
  ];

  const result = await executor.query(query, values);
  return result.rows[0].id;
}

export async function insertCompraItem(compraId: number, item: CompraItemInput, client?: any): Promise<void> {
  const executor = client || pool;

  const query = `
    INSERT INTO compras_itens (compra_id, produto_variacao_id, quantidade, preco_unitario)
    VALUES ($1, $2, $3, $4)
  `;

  const values = [
    compraId,
    item.produtoVariacaoId,
    item.quantidade,
    item.precoUnitario
  ];

  await executor.query(query, values);
  return;
}

export async function insertCompraPagamento(compraId: number, pagamento: CompraPagamentoInput, client?: any): Promise<void> {
  const executor = client || pool;

  const query = `
    INSERT INTO compras_pagamentos (compra_id, data_pagamento, valor_pago, forma_pagamento, status_parcela, observacao)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  const values = [
    compraId,
    pagamento.dataPagamento,
    pagamento.valorPago,
    pagamento.formaPagamento,
    pagamento.statusParcela,
    pagamento.observacao
  ];

  await executor.query(query, values);
  return;
}
