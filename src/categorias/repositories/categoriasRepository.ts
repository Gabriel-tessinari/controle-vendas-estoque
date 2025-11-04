import pool from "../../db";
import { categoriaDBEmCategoria } from "../mappers/categoriaDBEmCategoria";
import { Categoria } from "../models/Categoria";

export async function selectCategorias(client?: any): Promise<Categoria[]> {
  const executor = client || pool;

  const query = `SELECT * FROM categorias ORDER BY id`;

  const result = await executor.query(query);
  return result.rows.map(categoriaDBEmCategoria);
}
