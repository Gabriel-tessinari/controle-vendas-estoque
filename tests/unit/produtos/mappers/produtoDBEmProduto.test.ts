import { ProdutoDBMock } from "../../../mocks/produtos/ProdutoDBMock";
import { produtoDBEmProduto } from "../../../../src/produtos/mappers/produtoDBEmProduto";
import { Produto } from "../../../../src/produtos/models/Produto";

describe("produtoDBEmProduto", () => {
  it("deve mapear um produto corretamente", () => {
    const request = ProdutoDBMock.criarProdutoDB();
    const result: Produto = produtoDBEmProduto(request);

    expect(result).toEqual({
      id: request.id,
      nome: request.nome,
      categoriaId: request.categoria_id,
      variacoes: []
    });
  });
});
