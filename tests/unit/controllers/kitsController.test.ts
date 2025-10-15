import * as controller from "../../../src/controllers/kitsController";
import { BusinessError } from "../../../src/shared/errors/BusinessError";
import { KitsService } from "../../../src/services/kitsService";
import * as kitMapper from "../../../src/mappers/kitMapper";

jest.mock("../../../src/mappers/kitMapper");
jest.mock("../../../src/services/kitsService");

describe("kitsController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { body: { nome: "Kit Teste", precoVenda: 100, itens: [] } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    (kitMapper.mapRequestToKitInput as jest.Mock).mockReturnValue({
      nome: "Kit Teste",
      precoVenda: 100,
      itens: [{ produtoId: 1, quantidade: 1 }]
    });
  });

  describe("postKitComItens", () => {
    it("deve retornar 201 ao criar kit", async () => {
      (KitsService.postKit as jest.Mock).mockResolvedValue(18);

      await controller.postKitComItens(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Kit criado com sucesso (id: 18)",
        kitId: 18
      });
    });

    it("deve retornar 400 em caso de BusinessError", async () => {
      (KitsService.postKit as jest.Mock).mockRejectedValue(new BusinessError("Kit inválido"));

      await controller.postKitComItens(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Kit inválido" });
    });

    it("deve retornar 500 em caso de erro", async () => {
      (KitsService.postKit as jest.Mock).mockRejectedValue(new Error("Erro genérico"));

      await controller.postKitComItens(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao criar kit" });
    });
  });
});
