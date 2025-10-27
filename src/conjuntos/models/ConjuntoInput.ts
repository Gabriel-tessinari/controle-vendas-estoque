import { ConjuntoItemInput } from "./ConjuntoItemInput";

export interface ConjuntoInput {
  nome: string;
  descricao?: string;
  precoVenda: number;
  itens: ConjuntoItemInput[];
}