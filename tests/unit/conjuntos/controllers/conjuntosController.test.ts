import * as controller from "../../../../src/conjuntos/controllers/conjuntosController";
import { reqEmConjuntoInput } from "../../../../src/conjuntos/mappers/reqEmConjuntoInput";
import { cadastrarConjuntoComItens } from "../../../../src/conjuntos/usecases/cadastrarConjuntoComItens";
import { BusinessError } from "../../../../src/shared/errors/BusinessError";
import { ConjuntoInputMock } from "../../../mocks/conjuntos/ConjuntoInputMock";
import { ConjuntoMock } from "../../../mocks/conjuntos/ConjuntoMock";
import { ConjuntoRequestMock } from "../../../mocks/conjuntos/ConjuntoRequestMock";

jest.mock("../../../../src/conjuntos/mappers/reqEmConjuntoInput");
jest.mock("../../../../src/conjuntos/usecases/cadastrarConjuntoComItens");

describe("conjuntosController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { body: ConjuntoRequestMock.criar() };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("postConjuntoComItens", () => {
    it("deve retornar 201 ao cadastrar conjunto", async () => {
      const conjuntoInput = ConjuntoInputMock.criar();
      const conjunto = ConjuntoMock.criar();

      (reqEmConjuntoInput as jest.Mock).mockReturnValue(conjuntoInput);
      (cadastrarConjuntoComItens as jest.Mock).mockResolvedValue(conjunto);

      await controller.postConjuntoComItens(req, res);

      expect(reqEmConjuntoInput).toHaveBeenCalledWith(req.body);
      expect(cadastrarConjuntoComItens).toHaveBeenCalledWith(conjuntoInput);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(conjunto);
    });

    it("deve retornar 400 em caso de BusinessError", async () => {
      (reqEmConjuntoInput as jest.Mock).mockImplementation(() => {
        throw new BusinessError("Conjunto inválido.");
      });

      await controller.postConjuntoComItens(req, res);

      expect(reqEmConjuntoInput).toHaveBeenCalledWith(req.body);
      expect(cadastrarConjuntoComItens).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Conjunto inválido." });
    });

    it("deve retornar 500 em caso de erro inesperado", async () => {
      const conjuntoInput = ConjuntoInputMock.criar();

      (reqEmConjuntoInput as jest.Mock).mockReturnValue(conjuntoInput);
      (cadastrarConjuntoComItens as jest.Mock).mockRejectedValue(
        new Error("Erro genérico")
      );

      await controller.postConjuntoComItens(req, res);

      expect(reqEmConjuntoInput).toHaveBeenCalledWith(req.body);
      expect(cadastrarConjuntoComItens).toHaveBeenCalledWith(conjuntoInput);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao cadastrar conjunto.",
      });
    });
  });
});
