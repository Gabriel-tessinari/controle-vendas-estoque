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

import { cadastrarCompra } from "../../../../src/compras/usecases/cadastrarCompra";
import * as ComprasRepo from "../../../../src/compras/repositories/comprasRepository";
import { cadastrarMovimentacaoCompra } from "../../../../src/movimentacoes/usecases/cadastrarMovimentacaoCompra";
import { variacoesExistem } from "../../../../src/produtos/repositories/produtosVariacoesRepository";
import { pool } from "../../../../src/db"; // este pool é o mockPool
import { CompraInputMock } from "../../../mocks/compras/CompraInputMock";
import { BusinessError } from "../../../../src/shared/errors/BusinessError";

const dbMock = jest.requireMock("../../../../src/db") as {
  pool: { connect: jest.Mock },
  client: { query: jest.Mock, release: jest.Mock },
  default: any
};
const client = dbMock.client;

jest.mock("../../../../src/compras/repositories/comprasRepository");
jest.mock("../../../../src/movimentacoes/usecases/cadastrarMovimentacaoCompra");
jest.mock("../../../../src/produtos/repositories/produtosVariacoesRepository");

describe("usecase cadastrarCompra (transação completa)", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    (pool.connect as jest.Mock).mockResolvedValue(client);
  });

  it("deve fazer COMMIT e retornar o id da compra quando tudo ocorrer bem", async () => {
    const compraInput = CompraInputMock.criarCompraInput();

    client.query.mockResolvedValue(undefined);
    (variacoesExistem as jest.Mock).mockResolvedValue(true);
    (ComprasRepo.insertCompra as jest.Mock).mockResolvedValue(18);
    (ComprasRepo.insertCompraItem as jest.Mock).mockResolvedValue(undefined);
    (cadastrarMovimentacaoCompra as jest.Mock).mockResolvedValue(undefined);
    (ComprasRepo.insertCompraPagamento as jest.Mock).mockResolvedValue(undefined);

    const result = await cadastrarCompra(compraInput);

    expect(result).toBe(18);
    expect(client.query.mock.calls).toEqual([["BEGIN"], ["COMMIT"]]);
    expect(client.release).toHaveBeenCalled();
  });

  it("deve fazer ROLLBACK e lançar BusinessError se variações não existirem", async () => {
    const compraInput = CompraInputMock.criarCompraInput();
    (variacoesExistem as jest.Mock).mockResolvedValue(false);

    await expect(cadastrarCompra(compraInput)).rejects.toBeInstanceOf(BusinessError);

    expect(client.query.mock.calls).toEqual([["BEGIN"], ["ROLLBACK"]]);
    expect(client.release).toHaveBeenCalled();
    expect(ComprasRepo.insertCompra).not.toHaveBeenCalled();
    expect(ComprasRepo.insertCompraItem).not.toHaveBeenCalled();
    expect(cadastrarMovimentacaoCompra).not.toHaveBeenCalled();
    expect(ComprasRepo.insertCompraPagamento).not.toHaveBeenCalled();
  });

  it("deve fazer ROLLBACK se insertCompra lançar erro", async () => {
    const compraInput = CompraInputMock.criarCompraInput();

    (variacoesExistem as jest.Mock).mockResolvedValue(true);
    (ComprasRepo.insertCompra as jest.Mock).mockRejectedValue(new Error("Erro em insertCompra"));

    await expect(cadastrarCompra(compraInput)).rejects.toThrow("Erro em insertCompra");

    expect(client.query.mock.calls).toEqual([["BEGIN"], ["ROLLBACK"]]);
    expect(ComprasRepo.insertCompraItem).not.toHaveBeenCalled();
    expect(cadastrarMovimentacaoCompra).not.toHaveBeenCalled();
    expect(ComprasRepo.insertCompraPagamento).not.toHaveBeenCalled();
    expect(client.release).toHaveBeenCalled();
  });

  it("deve fazer ROLLBACK se insertCompraItem lançar erro", async () => {
    const compraInput = CompraInputMock.criarCompraInput();

    (variacoesExistem as jest.Mock).mockResolvedValue(true);
    (ComprasRepo.insertCompra as jest.Mock).mockResolvedValue(18);
    (ComprasRepo.insertCompraItem as jest.Mock).mockRejectedValue(new Error("Erro em insertCompraItem"));

    await expect(cadastrarCompra(compraInput)).rejects.toThrow("Erro em insertCompraItem");

    expect(client.query.mock.calls).toEqual([["BEGIN"], ["ROLLBACK"]]);
    expect(cadastrarMovimentacaoCompra).not.toHaveBeenCalled();
    expect(ComprasRepo.insertCompraPagamento).not.toHaveBeenCalled();
    expect(client.release).toHaveBeenCalled();
  });

  it("deve fazer ROLLBACK se cadastrarMovimentacaoCompra lançar erro", async () => {
    const compraInput = CompraInputMock.criarCompraInput();

    (variacoesExistem as jest.Mock).mockResolvedValue(true);
    (ComprasRepo.insertCompra as jest.Mock).mockResolvedValue(18);
    (ComprasRepo.insertCompraItem as jest.Mock).mockResolvedValue(undefined);
    (cadastrarMovimentacaoCompra as jest.Mock).mockRejectedValue(new Error("Erro em cadastrarMovimentacaoCompra"));

    await expect(cadastrarCompra(compraInput)).rejects.toThrow("Erro em cadastrarMovimentacaoCompra");

    expect(client.query.mock.calls).toEqual([["BEGIN"], ["ROLLBACK"]]);
    expect(ComprasRepo.insertCompraPagamento).not.toHaveBeenCalled();
    expect(client.release).toHaveBeenCalled();
  });

  it("deve fazer ROLLBACK se insertCompraPagamento lançar erro", async () => {
    const compraInput = CompraInputMock.criarCompraInput();

    (variacoesExistem as jest.Mock).mockResolvedValue(true);
    (ComprasRepo.insertCompra as jest.Mock).mockResolvedValue(1);
    (ComprasRepo.insertCompraItem as jest.Mock).mockResolvedValue(undefined);
    (cadastrarMovimentacaoCompra as jest.Mock).mockResolvedValue(undefined);
    (ComprasRepo.insertCompraPagamento as jest.Mock).mockRejectedValue(new Error("Erro em insertCompraPagamento"));

    await expect(cadastrarCompra(compraInput)).rejects.toThrow("Erro em insertCompraPagamento");

    expect(client.query.mock.calls).toEqual([["BEGIN"], ["ROLLBACK"]]);
    expect(client.release).toHaveBeenCalled();
  });
});
