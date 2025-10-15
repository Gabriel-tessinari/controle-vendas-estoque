import { Request, Response } from "express";
import { BusinessError } from "../shared/errors/BusinessError";
import { CompraInput } from "../models/Compra";
import { mapRequestToCompraInput } from "../mappers/compraMapper";
import { ComprasService } from "../services/comprasService";

export async function postCompraComItensEPagamentos(req: Request, res: Response): Promise<void> {
  try {
    const compra: CompraInput = mapRequestToCompraInput(req.body);

    const compraId: number = await ComprasService.postCompra(
      req.body.valorPago,
      req.body.quantidadeParcelas,
      req.body.formaPagamento,
      compra
    );

    res.status(201).json({
      message: `Compra criada com sucesso (id: ${compraId})`,
      compraId,
    });
  } catch (err) {
    if (err instanceof BusinessError) {
      res.status(400).json({ error: err.message });
    } else {
      console.error("Erro ao criar compra:", err);
      res.status(500).json({ error: "Erro ao criar compra" });
    }
  }
}
