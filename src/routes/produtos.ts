import { Router } from "express";
import { postProdutosComVariacoesLote } from "../produtos/controllers/produtosController";

const router = Router();

router.post("/lote", postProdutosComVariacoesLote);

export default router;