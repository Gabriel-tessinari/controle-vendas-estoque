import { ProdutoVariacao } from "../models/ProdutoVariacao";

export const produtoVariacaoDBEmProdutoVariacao = (body: any): ProdutoVariacao => {
  return {
    id: body.id,
    produtoId: body.produto_id,
    descricao: body.descricao,
    precoCompra: body.preco_compra,
    precoVenda: body.preco_venda,
    estoque: body.estoque
  }
}