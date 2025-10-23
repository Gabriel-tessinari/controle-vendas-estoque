import { MovimentacaoOrigem } from "./types/MovimentacaoOrigem";
import { MovimentacaoTipo } from "./types/MovimentacaoTipo";

export interface MovimentacaoInput {
  produtoVariacaoId: number;
  tipo: MovimentacaoTipo;
  quantidade: number;
  origem: MovimentacaoOrigem;
  referenciaId: number;
  data: string;
  observacao?: string;
}