import express, { Request, Response } from 'express';
import catalogoRoutes from './routes/catalogo';
import categoriasRoutes from './routes/categorias';
import comprasRoutes from './routes/compras';
import conjuntosRoutes from './routes/conjuntos';
import produtosRoutes from './routes/produtos';

const app = express();
app.use(express.json());

// Rotas
app.use('/catalogo', catalogoRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/compras', comprasRoutes);
app.use("/conjuntos", conjuntosRoutes);
app.use('/produtos', produtosRoutes);

app.get('/', (req: Request, res: Response): void => {
  res.send('API rodando 🚀');
});

const PORT = 3000;
app.listen(PORT, (): void => {
  console.log(`Servidor rodando na porta ${PORT}`);
});