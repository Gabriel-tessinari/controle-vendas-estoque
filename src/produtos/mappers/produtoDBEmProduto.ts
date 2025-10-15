import { Produto } from "../models/Produto";

export const produtoDBEmProduto = (body: any): Produto => {
  return {
    id: body.id,
    nome: body.nome,
    categoriaId: body.categoria_id,
    variacoes: []
  }
}