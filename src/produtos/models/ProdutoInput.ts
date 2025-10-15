import { ProdutoVariacaoInput } from "./ProdutoVariacaoInput";

export interface ProdutoInput {
  nome: string;
  categoriaId: number;
  variacoes: ProdutoVariacaoInput[];
}
