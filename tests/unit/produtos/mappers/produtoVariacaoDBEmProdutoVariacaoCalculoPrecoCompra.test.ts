import { ProdutoVariacaoDBMock } from "../../../mocks/produtos/ProdutoVariacaoDBMock";
import { produtoVariacaoDBEmProdutoVariacaoCalculoPrecoCompra } from "../../../../src/produtos/mappers/produtoVariacaoDBEmProdutoVariacaoCalculoPrecoCompra";
import { ProdutoVariacaoCalculoPrecoCompra } from "../../../../src/produtos/models/ProdutoVariacaoCalculoPrecoCompra";

describe("produtoVariacaoDBEmProdutoVariacaoCalculoPrecoCompra", () => {
  it("deve mapear uma variação de produto corretamente", () => {
    const request = ProdutoVariacaoDBMock.criarProdutoVariacaoDB();
    const result: ProdutoVariacaoCalculoPrecoCompra = produtoVariacaoDBEmProdutoVariacaoCalculoPrecoCompra(request);

    expect(result).toEqual({
      precoCompra: request.preco_compra,
      estoque: request.estoque
    });
  });
});
