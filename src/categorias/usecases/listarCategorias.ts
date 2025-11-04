import { Categoria } from "../models/Categoria";
import { selectCategorias } from "../repositories/categoriasRepository";

export async function listarCategorias(): Promise<Categoria[]> {
  const categorias = await selectCategorias();
  return categorias;
}
