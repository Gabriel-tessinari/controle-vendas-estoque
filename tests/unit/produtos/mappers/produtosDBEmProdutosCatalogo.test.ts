import { ProdutoCatalogoDBMock } from "../../../mocks/produtos/ProdutoCatalogoDBMock";
import { produtosDBEmProdutosCatalogo } from "../../../../src/produtos/mappers/produtosDBEmProdutosCatalogo";
import { Produto } from "../../../../src/produtos/models/Produto";

describe("produtosDBEmProdutosCatalogo", () => {
  it("deve mapear um produto corretamente", () => {
    const request = ProdutoCatalogoDBMock.criarLista();
    const result: Produto[] = produtosDBEmProdutosCatalogo(request);

    expect(result).toHaveLength(request.length);
    expect(result[0]).toStrictEqual({
      id: request[0].produto_id,
      nome: request[0].produto_nome,
      categoriaId: request[0].produto_categoria_id,
      variacoes: [{
        id: request[0].variacao_id,
        produtoId: request[0].variacao_produto_id,
        descricao: request[0].variacao_descricao,
        precoCompra: request[0].variacao_preco_compra,
        precoVenda: request[0].variacao_preco_venda,
        estoque: request[0].variacao_estoque
      }]
    });
  });
});
