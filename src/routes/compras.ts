import { Router } from "express";
import { postCompraComItensEPagamentos } from "../controllers/comprasController";

const router = Router();

router.post("/", postCompraComItensEPagamentos);

export default router;