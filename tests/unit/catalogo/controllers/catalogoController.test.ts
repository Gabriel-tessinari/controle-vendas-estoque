import * as controller from "../../../../src/catalogo/controllers/catalogoController";
import { listarCatalogo } from "../../../../src/catalogo/usecases/listarCatalogo";
import { BusinessError } from "../../../../src/shared/errors/BusinessError";
import { Aleatorios } from "../../../../src/shared/utils/aleatorio";
import { CatalogoMock } from "../../../mocks/catalogo/CatalogoMock";

jest.mock("../../../../src/catalogo/usecases/listarCatalogo");

describe("catalogoController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  describe("getCatalogo", () => {
    it("deve retornar 200 ao listar catálogo sem parâmetro de pesquisa", async () => {
      const catalogo = CatalogoMock.criar();
      (listarCatalogo as jest.Mock).mockResolvedValue(catalogo);

      await controller.getCatalogo(req, res);

      expect(listarCatalogo).toHaveBeenCalledWith("");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(catalogo);
    });

    it("deve retornar 200 ao listar catálogo com parâmetro de pesquisa", async () => {
      const pesquisa = Aleatorios.getString();
      const catalogo = CatalogoMock.criar();

      req.query = { pesquisar: pesquisa };
      (listarCatalogo as jest.Mock).mockResolvedValue(catalogo);

      await controller.getCatalogo(req, res);

      expect(listarCatalogo).toHaveBeenCalledWith(pesquisa);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(catalogo);
    });

    it("deve retornar 400 em caso de BusinessError", async () => {
      const businessError = new BusinessError("Erro de negócio");

      (listarCatalogo as jest.Mock).mockRejectedValue(businessError);

      await controller.getCatalogo(req, res);


      expect(listarCatalogo).toHaveBeenCalledWith("");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro de negócio" });
    });

    it("deve retornar 500 em caso de erro inesperado", async () => {
      (listarCatalogo as jest.Mock).mockRejectedValue(new Error("Erro genérico"));

      await controller.getCatalogo(req, res);

      expect(listarCatalogo).toHaveBeenCalledWith("");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro ao listar catálogo." });
    });
  });
});