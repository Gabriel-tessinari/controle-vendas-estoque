import { cadastrarCompra } from "../../../../src/compras/usecases/cadastrarCompra";
import * as ComprasRepo from "../../../../src/compras/repositories/comprasRepository";
import { cadastrarMovimentacaoCompra } from "../../../../src/movimentacao/usecases/cadastrarMovimentacaoCompra";
import { variacoesExistem } from "../../../../src/produtos/repositories/produtosRepository";
import pool from "../../../../src/db";
import { CompraInputMock } from "../../../mocks/compras/CompraInputMock";
import { BusinessError } from "../../../../src/shared/errors/BusinessError";

jest.mock("../../../../src/db", () => ({
  __esModule: true,
  default: { connect: jest.fn() }
}));
jest.mock("../../../../src/compras/repositories/comprasRepository");
jest.mock("../../../../src/produtos/repositories/produtosRepository");
jest.mock("../../../../src/movimentacao/usecases/cadastrarMovimentacaoCompra");

describe("cadastrarCompra", () => {
  let client: any;

  beforeEach(() => {
    client = {
      query: jest.fn(),
      release: jest.fn()
    };
    (pool.connect as jest.Mock).mockResolvedValue(client);
  });

  afterEach(() => jest.clearAllMocks());

  it("deve cadastrar compra com sucesso", async () => {
    const compraInput = CompraInputMock.criarCompraInput();

    (variacoesExistem as jest.Mock).mockResolvedValue(true);
    (ComprasRepo.insertCompra as jest.Mock).mockResolvedValue(18);
    (ComprasRepo.insertCompraItem as jest.Mock).mockResolvedValue(undefined);
    (ComprasRepo.insertCompraPagamento as jest.Mock).mockResolvedValue(undefined);
    (cadastrarMovimentacaoCompra as jest.Mock).mockResolvedValue(undefined);

    const result: number = await cadastrarCompra(compraInput);

    expect(client.query).toHaveBeenNthCalledWith(1, "BEGIN");
    expect(ComprasRepo.insertCompra).toHaveBeenCalledWith(compraInput, client);
    expect(ComprasRepo.insertCompraItem).toHaveBeenCalled();
    expect(cadastrarMovimentacaoCompra).toHaveBeenCalled();
    expect(ComprasRepo.insertCompraPagamento).toHaveBeenCalled();
    expect(client.query).toHaveBeenNthCalledWith(2, "COMMIT");
    expect(client.release).toHaveBeenCalled();
    expect(result).toBe(18);
  });

  it("deve fazer rollback e lançar BusinessError quando variações não existem", async () => {
    const compraInput = CompraInputMock.criarCompraInput();

    (variacoesExistem as jest.Mock).mockResolvedValue(false);

    await expect(cadastrarCompra(compraInput)).rejects
      .toMatchObject({ name: "BusinessError", message: "Uma ou mais variações de produto não existem." });

    expect(client.query).toHaveBeenNthCalledWith(1, "BEGIN");
    expect(client.query).toHaveBeenNthCalledWith(2, "ROLLBACK");
    expect(client.release).toHaveBeenCalled();
    expect(ComprasRepo.insertCompra).not.toHaveBeenCalled();
  });

  it("deve fazer rollback e lançar erro genérico", async () => {
    const compraInput = CompraInputMock.criarCompraInput();

    (variacoesExistem as jest.Mock).mockResolvedValue(true);
    (ComprasRepo.insertCompra as jest.Mock).mockRejectedValue(new Error("Erro genérico."));

    await expect(cadastrarCompra(compraInput)).rejects.toThrow("Erro genérico.");

    expect(client.query).toHaveBeenNthCalledWith(1, "BEGIN");
    expect(ComprasRepo.insertCompraItem).not.toHaveBeenCalled();
    expect(cadastrarMovimentacaoCompra).not.toHaveBeenCalled();
    expect(ComprasRepo.insertCompraPagamento).not.toHaveBeenCalled();
    expect(client.query).toHaveBeenNthCalledWith(2, "ROLLBACK");
    expect(client.release).toHaveBeenCalled();
  });
});
