import { Router } from "express";
import { getCategorias } from "../categorias/controllers/categoriasController";

const router = Router();

router.get("/", getCategorias);

export default router;
