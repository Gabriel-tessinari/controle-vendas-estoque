import { Router } from 'express';
import { getCategorias } from '../controllers/categoriasController';

const router = Router();

router.get('/', getCategorias);

export default router;
