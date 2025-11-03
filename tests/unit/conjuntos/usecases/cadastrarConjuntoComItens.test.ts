const clientMock = {
  query: jest.fn(),
  release: jest.fn(),
};

jest.mock("../../../../src/db", () => {
  const client = clientMock;
  const mockPool = {
    connect: jest.fn().mockResolvedValue(client),
  };

  return {
    __esModule: true,
    pool: mockPool,
    client,
    default: mockPool
  };
});

import { pool } from "../../../../src/db";
import { produtosExistem } from "../../../../src/produtos/repositories/produtosRepository";
import { insertConjunto } from "../../../../src/conjuntos/repositories/conjuntosRepository";
import { insertConjuntoItem } from "../../../../src/conjuntos/repositories/conjuntosItensRepository";
import { ConjuntoInputMock } from "../../../mocks/conjuntos/ConjuntoInputMock";
import { ConjuntoItemInputMock } from "../../../mocks/conjuntos/ConjuntoItemInputMock";
import { ConjuntoMock } from "../../../mocks/conjuntos/ConjuntoMock";
import { ConjuntoItemMock } from "../../../mocks/conjuntos/ConjuntoItemMock";
import { cadastrarConjuntoComItens } from "../../../../src/conjuntos/usecases/cadastrarConjuntoComItens";
import { BusinessError } from "../../../../src/shared/errors/BusinessError";

const dbMock = jest.requireMock("../../../../src/db") as {
  pool: { connect: jest.Mock },
  client: { query: jest.Mock, release: jest.Mock },
  default: any
};
const client = dbMock.client;

jest.mock("../../../../src/produtos/repositories/produtosRepository");
jest.mock("../../../../src/conjuntos/repositories/conjuntosRepository");
jest.mock("../../../../src/conjuntos/repositories/conjuntosItensRepository");

describe("cadastrarConjuntoComItens", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (pool.connect as jest.Mock).mockResolvedValue(client);
  });

  it("deve fazer COMMIT e retornar o conjunto criado", async () => {
    const conjuntoInput = ConjuntoInputMock.criar({ itens: ConjuntoItemInputMock.criarLista(1) });
    const conjunto = ConjuntoMock.criar({ itens: [] });
    const conjuntoItem = ConjuntoItemMock.criar();

    (produtosExistem as jest.Mock).mockResolvedValue(true);
    (insertConjunto as jest.Mock).mockResolvedValue(conjunto);
    (insertConjuntoItem as jest.Mock).mockResolvedValue(conjuntoItem);

    const resultado = await cadastrarConjuntoComItens(conjuntoInput);

    conjunto.itens.push(conjuntoItem);

    expect(resultado).toStrictEqual(conjunto);
    expect(client.query.mock.calls).toEqual([["BEGIN"], ["COMMIT"]]);
    expect(client.release).toHaveBeenCalled();
  });

  it("deve fazer ROLLBACK e lançar BusinessError se produtos não existirem", async () => {
    const conjuntoInput = ConjuntoInputMock.criar({ itens: ConjuntoItemInputMock.criarLista(1) });

    (produtosExistem as jest.Mock).mockResolvedValue(false);

    await expect(cadastrarConjuntoComItens(conjuntoInput)).rejects.toBeInstanceOf(BusinessError);

    expect(client.query.mock.calls).toEqual([["BEGIN"], ["ROLLBACK"]]);
    expect(client.release).toHaveBeenCalled();
    expect(insertConjunto).not.toHaveBeenCalled();
    expect(insertConjuntoItem).not.toHaveBeenCalled();
  });

  it("deve fazer ROLLBACK se insertConjunto lançar erro", async () => {
    const conjuntoInput = ConjuntoInputMock.criar({ itens: ConjuntoItemInputMock.criarLista(1) });

    (produtosExistem as jest.Mock).mockResolvedValue(true);
    (insertConjunto as jest.Mock).mockRejectedValue(new Error("Erro genérico"));

    await expect(cadastrarConjuntoComItens(conjuntoInput)).rejects.toThrow("Erro genérico");

    expect(client.query.mock.calls).toEqual([["BEGIN"], ["ROLLBACK"]]);
    expect(client.release).toHaveBeenCalled();
    expect(insertConjuntoItem).not.toHaveBeenCalled();
  });

  it("deve fazer ROLLBACK se insertConjuntoItem lançar erro", async () => {
    const conjuntoInput = ConjuntoInputMock.criar({ itens: ConjuntoItemInputMock.criarLista(1) });
    const conjunto = ConjuntoMock.criar({ itens: [] });

    (produtosExistem as jest.Mock).mockResolvedValue(true);
    (insertConjunto as jest.Mock).mockResolvedValue(conjunto);
    (insertConjuntoItem as jest.Mock).mockRejectedValue(new Error("Erro genérico"));

    await expect(cadastrarConjuntoComItens(conjuntoInput)).rejects.toThrow("Erro genérico");

    expect(client.query.mock.calls).toEqual([["BEGIN"], ["ROLLBACK"]]);
    expect(client.release).toHaveBeenCalled();
  });
});
