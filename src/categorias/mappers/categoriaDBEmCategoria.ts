import { Categoria } from "../models/Categoria";

export function categoriaDBEmCategoria(row: any): Categoria {
  return {
    id: row.id,
    nome: row.nome,
  };
}
