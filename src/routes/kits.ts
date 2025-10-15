import { Router } from "express";
import { postKitComItens } from "../controllers/kitsController";

const router = Router();

router.post("/", postKitComItens);

export default router;