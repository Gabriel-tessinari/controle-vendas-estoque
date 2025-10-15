import { Request, Response } from "express";
import { findAllCategorias } from "../repositories/categoriasRepository";
import { Categoria } from "../models/Categoria";

export async function getCategorias(req: Request, res: Response): Promise<void> {
  try {
    const categorias: Categoria[] = await findAllCategorias();
    res.status(200).json(categorias);
  } catch (err) {
    console.error("Erro ao buscar categorias:", err);
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
}