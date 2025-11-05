import { categoriaDBEmCategoria } from "../../../../src/categorias/mappers/categoriaDBEmCategoria";
import { CategoriaDBMock } from "../../../mocks/categorias/CategoriaDBMock";

describe("categoriaDBEmCategoria", () => {
  it("deve mapear uma categoria corretamente", () => {
    const objeto = CategoriaDBMock.criar();

    const resultado = categoriaDBEmCategoria(objeto);

    expect(resultado).toEqual({
      id: objeto.id,
      nome: objeto.nome,
    });
  });
});
