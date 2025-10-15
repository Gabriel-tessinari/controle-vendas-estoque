import express, { Request, Response } from 'express';
import categoriasRoutes from './routes/categorias';
import comprasRoutes from './routes/compras';
import produtosRoutes from './routes/produtos';
import kitsRoutes from './routes/kits';

const app = express();
app.use(express.json());

// Rotas
app.use('/categorias', categoriasRoutes);
app.use('compras', comprasRoutes);
app.use('/produtos', produtosRoutes);
app.use("/kits", kitsRoutes);

app.get('/', (req: Request, res: Response): void => {
  res.send('API rodando 🚀');
});

const PORT = 3000;
app.listen(PORT, (): void => {
  console.log(`Servidor rodando na porta ${PORT}`);
});