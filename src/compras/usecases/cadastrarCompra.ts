import { compraItemInputEmMovimentacao } from "../../movimentacoes/mappers/compraItemEmMovimentacao";
import { cadastrarMovimentacaoCompra } from "../../movimentacoes/usecases/cadastrarMovimentacaoCompra";
import { variacoesExistem } from "../../produtos/repositories/produtosVariacoesRepository";
import { executarTransacao } from "../../shared/utils/executarTransacao";
import { validar } from "../../shared/utils/validar";
import { CompraInput } from "../models/CompraInput";
import { CompraItemInput } from "../models/CompraItemInput";
import * as ComprasRepo from "../repositories/comprasRepository";

export async function cadastrarCompra(compra: CompraInput): Promise<number> {
  return executarTransacao(async (client) => {
    await validarItens(compra.itens);

    const compraId = await ComprasRepo.insertCompra(compra, client);

    for (const item of compra.itens) {
      await ComprasRepo.insertCompraItem(compraId, item, client);
      await cadastrarMovimentacaoCompra(
        compraItemInputEmMovimentacao(compraId, compra.dataCompra, item),
        item.precoUnitario,
        client
      );
    }

    for (const pagamento of compra.pagamentos) {
      await ComprasRepo.insertCompraPagamento(compraId, pagamento, client);
    }

    return compraId;
  });
}

async function validarItens(itens: CompraItemInput[]): Promise<void> {
  const variacaoIds = itens.map(i => i.produtoVariacaoId);
  const existem: boolean = await variacoesExistem(variacaoIds);

  validar(!existem, "Uma ou mais variações de produto não existem.");
}
