import { ProdutoVariacaoDBMock } from "../../../mocks/produtos/ProdutoVariacaoDBMock";
import { produtoVariacaoDBEmProdutoVariacao } from "../../../../src/produtos/mappers/produtoVariacaoDBEmProdutoVariacao";
import { ProdutoVariacao } from "../../../../src/produtos/models/ProdutoVariacao";

describe("produtoVariacaoDBEmProdutoVariacao", () => {
  it("deve mapear uma variação de produto corretamente", () => {
    const request = ProdutoVariacaoDBMock.criarProdutoVariacaoDB();
    const result: ProdutoVariacao = produtoVariacaoDBEmProdutoVariacao(request);

    expect(result).toEqual({
      id: request.id,
      produtoId: request.produto_id,
      descricao: request.descricao,
      precoCompra: request.preco_compra,
      precoVenda: request.preco_venda,
      estoque: request.estoque
    });
  });
});
