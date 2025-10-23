import { ProdutoVariacaoCalculoPrecoCompra } from "../models/ProdutoVariacaoCalculoPrecoCompra";

export const produtoVariacaoDBEmProdutoVariacaoCalculoPrecoCompra = (body: any): ProdutoVariacaoCalculoPrecoCompra => {
  return {
    precoCompra: body.preco_compra,
    estoque: body.estoque
  }
}