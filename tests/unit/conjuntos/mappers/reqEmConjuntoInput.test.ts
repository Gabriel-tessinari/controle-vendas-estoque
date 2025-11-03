import { reqEmConjuntoInput } from "../../../../src/conjuntos/mappers/reqEmConjuntoInput";
import { BusinessError } from "../../../../src/shared/errors/BusinessError";
import { ConjuntoItemRequestMock } from "../../../mocks/conjuntos/ConjuntoItemRequestMock";
import { ConjuntoRequestMock } from "../../../mocks/conjuntos/ConjuntoRequestMock";

describe("reqEmConjuntoInput", () => {
  it("deve mapear corretamente o request para ConjuntoInput", () => {
    const body: any = ConjuntoRequestMock.criar({
      itens: ConjuntoItemRequestMock.criarLista(1),
    });

    const resultado = reqEmConjuntoInput(body);

    expect(resultado).toStrictEqual({
      nome: body.nome,
      descricao: body.descricao,
      precoVenda: body.precoVenda,
      itens: [
        {
          produtoId: body.itens[0].produtoId,
          quantidade: body.itens[0].quantidade,
        },
      ],
    });
  });

  it("deve lançar erro se nome for inválido", () => {
    const body: any = ConjuntoRequestMock.criar({ nome: undefined });

    expect(() => reqEmConjuntoInput(body)).toThrow(BusinessError);
    expect(() => reqEmConjuntoInput(body)).toThrow("Conjunto: nome inválido.");
  });

  it("deve lançar erro se precoVenda for inválido", () => {
    const body: any = ConjuntoRequestMock.criar({ precoVenda: 0 });

    expect(() => reqEmConjuntoInput(body)).toThrow(BusinessError);
    expect(() => reqEmConjuntoInput(body)).toThrow(
      "Conjunto: preço de venda inválido."
    );
  });

  it("deve lançar erro se lista de itens vazia", () => {
    const body: any = ConjuntoRequestMock.criar({ itens: [] });

    expect(() => reqEmConjuntoInput(body)).toThrow(BusinessError);
    expect(() => reqEmConjuntoInput(body)).toThrow(
      "A lista de itens deve conter ao menos um item."
    );
  });

  it("deve lançar erro se produtoId do item for inválido", () => {
    const body: any = ConjuntoRequestMock.criar({
      itens: [ConjuntoItemRequestMock.criar({ produtoId: 0 })],
    });

    expect(() => reqEmConjuntoInput(body)).toThrow(BusinessError);
    expect(() => reqEmConjuntoInput(body)).toThrow(
      "Conjunto - Item #1: id do produto inválido."
    );
  });

  it("deve lançar erro se quantidade do item for inválida", () => {
    const body: any = ConjuntoRequestMock.criar({
      itens: [ConjuntoItemRequestMock.criar({ quantidade: 0 })],
    });

    expect(() => reqEmConjuntoInput(body)).toThrow(BusinessError);
    expect(() => reqEmConjuntoInput(body)).toThrow(
      "Conjunto - Item #1: quantidade inválida."
    );
  });
});
