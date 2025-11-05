import { Request, Response } from "express";
import { BusinessError } from "../../shared/errors/BusinessError";
import { reqEmProdutoInputLote } from "../mappers/reqEmProdutoInputLote";
import { Produto } from "../models/Produto";
import { ProdutoInput } from "../models/ProdutoInput";
import { insertProdutosComVariacoesLote } from "../repositories/produtosRepository";

export async function postProdutosComVariacoesLote(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const produtos: ProdutoInput[] = reqEmProdutoInputLote(req.body);
    const produtosResponse: Produto[] = await insertProdutosComVariacoesLote(
      produtos
    );

    res.status(201).json({
      message: "Produtos cadastrados com sucesso.",
      produtosResponse,
    });
  } catch (err) {
    if (err instanceof BusinessError) {
      res.status(400).json({ error: err.message });
    } else {
      console.error("Erro ao cadastrar produtos:", err);
      res.status(500).json({ error: "Erro ao cadastrar produtos." });
    }
  }
}
