import { Request, Response } from "express";
import { listarCategorias } from "../usecases/listarCategorias";

export async function getCategorias(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const categorias = await listarCategorias();
    res.status(200).json(categorias);
  } catch (err) {
    console.error("Erro ao listar categorias:", err);
    res.status(500).json({ error: "Erro ao listar categorias" });
  }
}
