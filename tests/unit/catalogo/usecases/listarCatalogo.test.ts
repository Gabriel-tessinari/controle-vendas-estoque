import { ProdutoMock } from "../../../mocks/produtos/ProdutoMock";
import { ConjuntoMock } from "../../../mocks/conjuntos/ConjuntoMock";
import { selectProdutosComVariacoes } from "../../../../src/produtos/repositories/produtosRepository";
import { selectConjuntosComItens } from "../../../../src/conjuntos/repositories/conjuntosRepository";
import { listarCatalogo } from "../../../../src/catalogo/usecases/listarCatalogo";
import { Aleatorios } from "../../../../src/shared/utils/aleatorio";

jest.mock("../../../../src/produtos/repositories/produtosRepository");
jest.mock("../../../../src/conjuntos/repositories/conjuntosRepository");

describe("listarCatalogo", () => {
  it("deve listar catálogo após selecionar produtos e conjuntos", async () => {
    const pesquisa = Aleatorios.getString();
    const produtos = ProdutoMock.criarListaDeProdutos();
    const conjuntos = ConjuntoMock.criarLista();

    (selectProdutosComVariacoes as jest.Mock).mockResolvedValue(produtos);
    (selectConjuntosComItens as jest.Mock).mockResolvedValue(conjuntos);

    const catalogo = await listarCatalogo(pesquisa);

    expect(selectProdutosComVariacoes).toHaveBeenCalledWith(pesquisa);
    expect(selectConjuntosComItens).toHaveBeenCalledWith(pesquisa);
    expect(catalogo).toStrictEqual({ produtos, conjuntos });
  });
});