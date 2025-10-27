import { Request, Response } from "express";
import { BusinessError } from "../../shared/errors/BusinessError";
import { listarCatalogo } from "../usecases/listarCatalogo";

export async function getCatalogo(req: Request, res: Response): Promise<void> {
  try {
    const pesquisar = req.query.pesquisar ? String(req.query.pesquisar) : "";

    const catalogo = await listarCatalogo(pesquisar);

    res.status(200).json(catalogo);
  } catch (err) {
    if (err instanceof BusinessError) {
      res.status(400).json({ error: err.message });
    } else {
      console.error("Erro ao listar catálogo:", err);
      res.status(500).json({ error: "Erro ao listar catálogo." });
    }
  }
}
