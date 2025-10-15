import pool from "../db";
import { mapCategoria } from "../mappers/categoriaMapper";
import { Categoria } from "../models/Categoria";

export async function findAllCategorias(): Promise<Categoria[]> {
  const result = await pool.query("SELECT * FROM categorias ORDER BY id");
  return result.rows.map(mapCategoria);
}