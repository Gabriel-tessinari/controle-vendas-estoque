import { ProdutoVariacaoCalculoPrecoCompra } from "../models/ProdutoVariacaoCalculoPrecoCompra";
import { selectEstoqueEPrecoCompraFromProdutosVariacoes, updateProdutoVariacaoSetEstoqueEPrecoCompra } from "../repositories/produtosVariacoesRepository";

export async function alterarProdutoVariacaoDuranteCompra(produtoVariacaoId: number, precoCompra: number, quantidade: number, client?: any): Promise<void> {
  const variacaoDB = await selectEstoqueEPrecoCompraFromProdutosVariacoes(produtoVariacaoId, client);
  const novoEstoque = variacaoDB.estoque + quantidade;
  const novoPrecoCompra = calculaPrecoCompraMedio(quantidade, precoCompra, novoEstoque, variacaoDB);
  await updateProdutoVariacaoSetEstoqueEPrecoCompra(produtoVariacaoId, novoEstoque, novoPrecoCompra, client);
}

function calculaPrecoCompraMedio(
  quantidade: number,
  precoCompra: number,
  novoEstoque: number,
  varaicaoDB: ProdutoVariacaoCalculoPrecoCompra
): number {
  return (quantidade * precoCompra + varaicaoDB.estoque * varaicaoDB.precoCompra) / novoEstoque;
}
