import { ProdutoMock } from "../../../mocks/produtos/ProdutoMock";
import { ConjuntoMock } from "../../../mocks/conjuntos/ConjuntoMock";
import { produtosEConjuntosEmCatalogo } from "../../../../src/catalogo/mappers/produtosEConjuntosEmCatalogo";

describe("produtosEConjuntosEmCatalogo", () => {
  it("deve mapear um catálogo corretamente", () => {
    const produtos = ProdutoMock.criarListaDeProdutos();
    const conjuntos = ConjuntoMock.criarLista();
    const result = produtosEConjuntosEmCatalogo(produtos, conjuntos);

    expect(result).toStrictEqual({ produtos, conjuntos });
  });
});
