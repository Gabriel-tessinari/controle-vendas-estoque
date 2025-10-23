import { alterarProdutoVariacaoDuranteCompra } from "../../produtos/usecases/alterarProdutoVariacaoDuranteCompra";
import { MovimentacaoInput } from "../models/MovimentacaoInput";
import { insertMovimentacao } from "../repositories/movimentacaoRepository";

export async function cadastrarMovimentacaoCompra(movimentacao: MovimentacaoInput, precoUnitario: number, client?: any): Promise<void> {
  await insertMovimentacao(movimentacao, client);
  await alterarProdutoVariacaoDuranteCompra(movimentacao.produtoVariacaoId, precoUnitario, movimentacao.quantidade, client);
}
