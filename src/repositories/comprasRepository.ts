import pool from "../db";
import { CompraInput } from "../models/Compra";

export async function insertCompraComItensEPagamentos(compra: CompraInput): Promise<number> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const compraResult = await client.query(
      `INSERT INTO compras (fornecedor_id, data_compra, frete, outras_taxas, status_pagamento)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        compra.fornecedorId,
        compra.dataCompra,
        compra.frete,
        compra.outrasTaxas,
        compra.statusPagamento
      ]
    );
    const compraId: number = compraResult.rows[0].id;

    for (const item of compra.itens) {
      await client.query(
        `INSERT INTO compras_itens (compra_id, produto_variacao_id, quantidade, preco_unitario)
         VALUES ($1, $2, $3, $4)`,
        [
          compraId,
          item.produtoVariacaoId,
          item.quantidade,
          item.precoUnitario
        ]
      );
    }

    for (const pagamento of compra.pagamentos) {
      await client.query(
        `INSERT INTO compras_pagamentos (compra_id, data_pagamento, valor_pago, forma_pagamento, status_parcela, observacao)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          compraId,
          pagamento.dataPagamento,
          pagamento.valorPago,
          pagamento.formaPagamento,
          pagamento.statusParcela,
          pagamento.observacao
        ]
      );
    }

    await client.query("COMMIT");
    return compraId;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
