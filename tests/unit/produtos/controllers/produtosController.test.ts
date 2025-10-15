import * as controller from "../../../../src/produtos/controllers/produtosController";
import * as produtosRepo from "../../../../src/produtos/repositories/produtosRepository";
import { reqEmProdutoInputLote } from "../../../../src/produtos/mappers/reqEmProdutoInputLote";
import { ProdutoRequestMock } from "../../../mocks/produtos/ProdutoRequestMock";
import { BusinessError } from "../../../../src/shared/errors/BusinessError";
import { ProdutoMock } from "../../../mocks/produtos/ProdutoMock";
import { Produto } from "../../../../src/produtos/models/Produto";

jest.mock("../../../../src/produtos/mappers/reqEmProdutoInputLote");
jest.mock("../../../../src/produtos/repositories/produtosRepository");

describe("produtosController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { body: ProdutoRequestMock.criarListaDeProdutosRequest() };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  describe("postProdutosComVariacoesLote", () => {
    it("deve retornar 201 ao cadastrar produtos", async () => {
      const expected: Produto[] = ProdutoMock.criarListaDeProdutos();

      (reqEmProdutoInputLote as jest.Mock).mockReturnValue([]);
      (produtosRepo.insertProdutosComVariacoesLote as jest.Mock)
        .mockResolvedValue(expected);

      await controller.postProdutosComVariacoesLote(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Produtos cadastrados com sucesso.",
        produtosResponse: expected
      });
    });

    it("deve retornar 400 em caso de BusinessError", async () => {
      (reqEmProdutoInputLote as jest.Mock).mockImplementation(() => {
        throw new BusinessError("Erro de negócio.");
      });

      await controller.postProdutosComVariacoesLote(req, res);

      expect(produtosRepo.insertProdutosComVariacoesLote).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro de negócio." });
    });

    it("deve retornar 500 em caso de erro inesperado", async () => {
      (reqEmProdutoInputLote as jest.Mock).mockReturnValue([]);
      (produtosRepo.insertProdutosComVariacoesLote as jest.Mock)
        .mockRejectedValue(new Error("Erro genérico"));

      await controller.postProdutosComVariacoesLote(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao cadastrar produtos." });
    });
  });
});
