import { Router } from "express";
import { postCompraComItensEPagamentos } from "../compras/controllers/comprasController";

const router = Router();

router.post("/", postCompraComItensEPagamentos);

export default router;