import { Conjunto } from "../models/Conjunto";
import { ConjuntoItem } from "../models/ConjuntoItem";

export function conjuntosDBEmConjuntosCatalogo(body: any[]): Conjunto[] {
  const conjuntosMap = new Map<number, Conjunto>();

  for (const row of body) {
    if (!conjuntosMap.has(row.id)) {
      conjuntosMap.set(row.id, {
        id: row.id,
        nome: row.nome,
        precoCompra: Number(row.preco_compra),
        precoVenda: Number(row.preco_venda),
        descricao: row.descricao,
        ativo: row.ativo,
        itens: []
      });
    }

    if (row.item_id) {
      const item: ConjuntoItem = {
        id: row.item_id,
        produtoId: row.produto_id,
        conjuntoId: row.conjunto_id,
        quantidade: row.quantidade
      };
      conjuntosMap.get(row.conjunto_id)!.itens.push(item);
    }
  }

  return Array.from(conjuntosMap.values());
}