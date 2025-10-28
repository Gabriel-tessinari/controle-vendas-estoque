import { ConjuntoItem } from "../models/ConjuntoItem";

export function conjuntoItemDBEmConjuntoItem(body: any): ConjuntoItem {
  return {
    id: body.id,
    conjuntoId: body.conjunto_id,
    produtoId: body.produto_id,
    quantidade: body.quantidade
  }
}