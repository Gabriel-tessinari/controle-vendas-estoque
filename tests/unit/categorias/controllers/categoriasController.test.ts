import * as controller from "../../../../src/categorias/controllers/categoriasController";
import { listarCategorias } from "../../../../src/categorias/usecases/listarCategorias";
import { CategoriaMock } from "../../../mocks/categorias/CategoriaMock";

jest.mock("../../../../src/categorias/usecases/listarCategorias");

describe("categoriasController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getCategorias", () => {
    it("deve retornar lista de categorias", async () => {
      const categorias = CategoriaMock.criar();

      (listarCategorias as jest.Mock).mockResolvedValue(categorias);

      await controller.getCategorias(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(categorias);
    });

    it("deve retornar 500 em caso de erro", async () => {
      (listarCategorias as jest.Mock).mockRejectedValue(
        new Error("Erro genérico.")
      );

      await controller.getCategorias(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao listar categorias.",
      });
    });
  });
});
