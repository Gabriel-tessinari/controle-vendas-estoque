import { Categoria } from "../models/Categoria";

export function mapCategoria(row: any): Categoria {
  return {
    id: row.id,
    nome: row.nome,
  };
}