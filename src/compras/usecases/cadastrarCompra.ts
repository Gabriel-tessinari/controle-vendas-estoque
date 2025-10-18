import pool from "../../db";
import { compraItemInputEmMovimentacao } from "../../movimentacao/mappers/compraItemEmMovimentacao";
import { cadastrarMovimentacaoCompra } from "../../movimentacao/usecases/cadastrarMovimentacaoCompra";
import { variacoesExistem } from "../../produtos/repositories/produtosRepository";
import { validar } from "../../shared/utils/validar";
import { CompraInput } from "../models/CompraInput";
import { CompraItemInput } from "../models/CompraItemInput";
import * as ComprasRepo from "../repositories/comprasRepository";

export async function cadastrarCompra(compra: CompraInput): Promise<number> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await validacoes(compra.itens);

    const compraId: number = await ComprasRepo.insertCompra(compra, client);

    for (const item of compra.itens) {
      await ComprasRepo.insertCompraItem(compraId, item, client);
      await cadastrarMovimentacaoCompra(compraItemInputEmMovimentacao(compraId, compra.dataCompra, item), client);
    }

    for (const pagamento of compra.pagamentos) {
      await ComprasRepo.insertCompraPagamento(compraId, pagamento, client);
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

async function validacoes(itens: CompraItemInput[]): Promise<void> {
  const variacaoIds: number[] = [];

  for (const item of itens) {
    variacaoIds.push(item.produtoVariacaoId);
  }

  const existem: boolean = await variacoesExistem(variacaoIds);

  validar(!existem, "Uma ou mais variações de produto não existem.");

  return;
}
