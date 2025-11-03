import { Router } from "express";
import { postConjuntoComItens } from "../conjuntos/controllers/conjuntosController";

const router = Router();

router.post("/", postConjuntoComItens);

export default router;