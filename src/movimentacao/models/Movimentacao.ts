import { MovimentacaoOrigem } from "./types/MovimentacaoOrigem";
import { MovimentacaoTipo } from "./types/MovimentacaoTipo";

export interface Movimentacao {
  id: number;
  produtoVariacaoId: number;
  tipo: MovimentacaoTipo;
  quantidade: number;
  origem: MovimentacaoOrigem;
  referenciaId: number;
  observacao: string;
  data: string;
}