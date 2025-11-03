import { conjuntoDBEmConjunto } from "../../../../src/conjuntos/mappers/conjuntoDBEmConjunto";
import { ConjuntoDBMock } from "../../../mocks/conjuntos/ConjuntoDBMock";
import { Conjunto } from "../../../../src/conjuntos/models/Conjunto";

describe("conjuntoDBEmConjunto", () => {
  it("deve mapear um conjunto corretamente", () => {
    const request = ConjuntoDBMock.criar();
    const resultado: Conjunto = conjuntoDBEmConjunto(request);

    expect(resultado).toStrictEqual({
      id: request.id,
      nome: request.nome,
      descricao: request.descricao,
      ativo: request.ativo,
      precoCompra: request.preco_compra,
      precoVenda: request.preco_venda,
      itens: []
    });
  });
});
