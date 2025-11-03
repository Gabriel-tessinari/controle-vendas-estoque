import { Produto } from "../models/Produto";
import { ProdutoVariacao } from "../models/ProdutoVariacao";

export function produtosDBEmProdutosCatalogo(body: any[]): Produto[] {
  const produtosMap = new Map<number, Produto>();

  for (const row of body) {
    if (!produtosMap.has(row.produto_id)) {
      produtosMap.set(row.produto_id, {
        id: row.produto_id,
        nome: row.produto_nome,
        categoriaId: row.produto_categoria_id,
        variacoes: [],
      });
    }

    if (row.variacao_id) {
      const variacao: ProdutoVariacao = {
        id: row.variacao_id,
        produtoId: row.variacao_produto_id,
        descricao: row.variacao_descricao,
        precoCompra: Number(row.variacao_preco_compra),
        precoVenda: Number(row.variacao_preco_venda),
        estoque: Number(row.variacao_estoque),
      };
      produtosMap.get(row.produto_id)!.variacoes.push(variacao);
    }
  }

  return Array.from(produtosMap.values());
}