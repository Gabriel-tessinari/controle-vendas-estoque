import { updateProdutoVariacaoEstoque } from "../../produtos/repositories/produtosRepository";
import { MovimentacaoInput } from "../models/MovimentacaoInput";
import { insertMovimentacao } from "../repositories/movimentacaoRepository";

export async function cadastrarMovimentacaoCompra(movimentacao: MovimentacaoInput, client?: any): Promise<void> {
  await insertMovimentacao(movimentacao, client);
  await updateProdutoVariacaoEstoque(movimentacao.produtoVariacaoId, movimentacao.quantidade, client);
  return;
}
