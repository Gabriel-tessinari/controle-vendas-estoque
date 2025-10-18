import { CompraItemInput } from "../../compras/models/CompraItemInput";
import { MovimentacaoInput } from "../models/MovimentacaoInput";

export function compraItemInputEmMovimentacao(compraId: number, dataCompra: string, compraItem: CompraItemInput): MovimentacaoInput {
  return {
    produtoVariacaoId: compraItem.produtoVariacaoId,
    quantidade: compraItem.quantidade,
    referenciaId: compraId,
    data: dataCompra,
    tipo: "ENTRADA",
    origem: "COMPRA"
  }
}
