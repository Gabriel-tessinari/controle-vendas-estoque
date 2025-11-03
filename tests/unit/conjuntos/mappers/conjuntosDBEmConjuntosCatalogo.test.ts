import { conjuntosDBEmConjuntosCatalogo } from "../../../../src/conjuntos/mappers/conjuntosDBEmConjuntosCatalogo";
import { Conjunto } from "../../../../src/conjuntos/models/Conjunto";
import { ConjuntoDBComItemDBMock } from "../../../mocks/conjuntos/ConjuntoDBComItemDBMock";

describe("conjuntosDBEmConjuntosCatalogo", () => {
  it("deve mapear conjuntos corretamente", () => {
    const request = ConjuntoDBComItemDBMock.criarLista(1);
    const resultado: Conjunto[] = conjuntosDBEmConjuntosCatalogo(request);

    expect(resultado[0]).toStrictEqual({
      id: request[0].id,
      nome: request[0].nome,
      descricao: request[0].descricao,
      precoCompra: request[0].preco_compra,
      precoVenda: request[0].preco_venda,
      ativo: request[0].ativo,
      itens: [
        {
          id: request[0].item_id,
          conjuntoId: request[0].conjunto_id,
          produtoId: request[0].produto_id,
          quantidade: request[0].quantidade,
        },
      ],
    });
  });
});
