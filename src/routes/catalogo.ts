import { Router } from "express";
import { getCatalogo } from "../catalogo/controllers/catalogoController";

const router = Router();

router.get("/", getCatalogo);

export default router;