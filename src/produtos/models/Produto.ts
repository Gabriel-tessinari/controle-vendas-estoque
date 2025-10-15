import { ProdutoVariacao } from "./ProdutoVariacao";

export interface Produto {
  id: number;
  nome: string;
  categoriaId: number;
  variacoes: ProdutoVariacao[];
}
