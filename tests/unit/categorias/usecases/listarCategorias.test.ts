import { selectCategorias } from "../../../../src/categorias/repositories/categoriasRepository";
import { listarCategorias } from "../../../../src/categorias/usecases/listarCategorias";
import { CategoriaMock } from "../../../mocks/categorias/CategoriaMock";

jest.mock("../../../../src/categorias/repositories/categoriasRepository");

describe("listarCategorias", () => {
  it("deve retornar lista de categorias", async () => {
    const categorias = CategoriaMock.criarLista(1);

    (selectCategorias as jest.Mock).mockResolvedValue(categorias);

    const resultado = await listarCategorias();

    expect(resultado).toStrictEqual(categorias);
  });
});
