import { ConjuntoItem } from "./ConjuntoItem";

export interface Conjunto {
  id: number;
  nome: string;
  descricao?: string;
  precoCompra: number;
  precoVenda: number;
  ativo: boolean;
  itens: ConjuntoItem[];
}