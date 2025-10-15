import * as mapper from "../../../src/mappers/categoriaMapper";
import { Categoria } from "../../../src/models/Categoria";

describe("categoriaMapper", () => {
  describe("mapCategoria", () => {
    it("deve mapear corretamente uma row para Categoria", () => {
      const row = { id: 18, nome: "Categoria Teste" };

      const result: Categoria = mapper.mapCategoria(row);

      expect(result).toEqual({
        id: 18,
        nome: "Categoria Teste",
      });
    });

    it("deve retornar undefined se campos não existirem", () => {
      const row = {};

      const result: Categoria = mapper.mapCategoria(row);

      expect(result).toEqual({
        id: undefined,
        nome: undefined,
      });
    });

    it("deve ignorar campos extras", () => {
      const row = { id: 18, nome: "Categoria Teste", extra: "ignorado" };

      const result: Categoria = mapper.mapCategoria(row);

      expect(result).toEqual({
        id: 18,
        nome: "Categoria Teste",
      });
    });
  });
});
