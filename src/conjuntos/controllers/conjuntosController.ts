import { Request, Response } from "express";
import { BusinessError } from "../../shared/errors/BusinessError";
import { reqEmConjuntoInput } from "../mappers/reqEmConjuntoInput";
import { cadastrarConjuntoComItens } from "../usecases/cadastrarConjuntoComItens";

export async function postConjuntoComItens(req: Request, res: Response): Promise<void> {
  try {
    const conjuntoInput = reqEmConjuntoInput(req.body);

    const conjunto = await cadastrarConjuntoComItens(conjuntoInput);

    res.status(201).json(conjunto);
  } catch (err) {
    if (err instanceof BusinessError) {
      res.status(400).json({ error: err.message });
    } else {
      console.error("Erro ao cadastrar conjunto:", err);
      res.status(500).json({ error: "Erro ao cadastrar conjunto." });
    }
  }
}