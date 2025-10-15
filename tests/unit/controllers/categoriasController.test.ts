import * as controller from "../../../src/controllers/categoriasController";
import { Categoria } from "../../../src/models/Categoria";
import * as categoriasRepository from "../../../src/repositories/categoriasRepository";

jest.mock("../../../src/repositories/categoriasRepository");

describe("categoriasController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe("getCategorias", () => {
    it("deve retornar lista de categorias", async () => {
      const categorias: Categoria[] = [{ id: 18, nome: "Categoria Teste" }];

      (categoriasRepository.findAllCategorias as jest.Mock).mockResolvedValue(categorias);

      await controller.getCategorias(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(categorias);
    });

    it("deve retornar 500 em caso de erro", async () => {
      (categoriasRepository.findAllCategorias as jest.Mock).mockRejectedValue(new Error("Erro genérico"));

      await controller.getCategorias(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar categorias" });
    });
  });
});
