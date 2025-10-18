import { Request, Response } from "express";
import { reqEmCompraInput } from "../mappers/reqEmCompraInput";
import { CompraInput } from "../models/CompraInput";
import { BusinessError } from "../../shared/errors/BusinessError";
import { cadastrarCompra } from "../usecases/cadastrarCompra";

export async function postCompraComItensEPagamentos(req: Request, res: Response): Promise<void> {
  try {
    const compra: CompraInput = reqEmCompraInput(req.body);

    const compraId: number = await cadastrarCompra(compra);

    res.status(201).json({
      message: "Compra cadastrada com sucesso.",
      compraId,
    });
  } catch (err) {
    if (err instanceof BusinessError) {
      res.status(400).json({ error: err.message });
    } else {
      console.error("Erro ao cadastrar compra:", err);
      res.status(500).json({ error: "Erro ao cadastrar compra." });
    }
  }
}
