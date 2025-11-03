import { Conjunto } from "../models/Conjunto";

export function conjuntoDBEmConjunto(body: any): Conjunto {
  return {
    id: body.id,
    nome: body.nome,
    precoVenda: body.preco_venda,
    precoCompra: body.preco_compra,
    ativo: body.ativo,
    descricao: body.descricao,
    itens: []
  }
}