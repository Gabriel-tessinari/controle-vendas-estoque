import { conjuntoItemDBEmConjuntoItem } from "../../../../src/conjuntos/mappers/conjuntoItemDBEmConjuntoItem";
import { ConjuntoItem } from "../../../../src/conjuntos/models/ConjuntoItem";
import { ConjuntoItemDBMock } from "../../../mocks/conjuntos/ConjuntoItemDBMock";

describe("conjuntoItemDBEmConjuntoItem", () => {
  it("deve mapear um item de conjunto corretamente", () => {
    const request = ConjuntoItemDBMock.criar();
    const resultado: ConjuntoItem = conjuntoItemDBEmConjuntoItem(request);

    expect(resultado).toStrictEqual({
      id: request.id,
      conjuntoId: request.conjunto_id,
      produtoId: request.produto_id,
      quantidade: request.quantidade,
    });
  });
});
