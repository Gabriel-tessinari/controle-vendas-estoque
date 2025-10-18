import * as controller from "../../../../src/compras/controllers/comprasController";
import { BusinessError } from "../../../../src/shared/errors/BusinessError";
import { reqEmCompraInput } from "../../../../src/compras/mappers/reqEmCompraInput";
import { cadastrarCompra } from "../../../../src/compras/usecases/cadastrarCompra";
import { CompraRequestMock } from "../../../mocks/compras/CompraRequestMock";
import { CompraInputMock } from "../../../mocks/compras/CompraInputMock";

jest.mock("../../../../src/compras/mappers/reqEmCompraInput");
jest.mock("../../../../src/compras/usecases/cadastrarCompra");

describe("comprasController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { body: CompraRequestMock.criarCompraRequest() };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe("postCompraComItensEPagamentos", () => {
    it("deve retornar 201 ao cadastrar compra", async () => {
      (reqEmCompraInput as jest.Mock).mockReturnValue(CompraInputMock.criarCompraInput());
      (cadastrarCompra as jest.Mock).mockResolvedValue(18);

      await controller.postCompraComItensEPagamentos(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Compra cadastrada com sucesso.",
        compraId: 18
      });
    });

    it("deve retornar 400 em caso de BusinessError", async () => {
      (reqEmCompraInput as jest.Mock).mockImplementation(() => {
        throw new BusinessError("Compra inválida.");
      });

      await controller.postCompraComItensEPagamentos(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Compra inválida." });
      expect(cadastrarCompra).toHaveBeenCalledTimes(0);
    });

    it("deve retornar 500 em caso de erro", async () => {
      (reqEmCompraInput as jest.Mock).mockReturnValue(CompraInputMock.criarCompraInput());
      (cadastrarCompra as jest.Mock).mockRejectedValue(new Error("Erro genérico."));

      await controller.postCompraComItensEPagamentos(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao cadastrar compra." });
    });
  });
});
