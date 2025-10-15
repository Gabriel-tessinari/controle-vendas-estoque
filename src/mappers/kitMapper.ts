import { BusinessError } from "../shared/errors/BusinessError";
import { KitInput, KitItemInput } from "../models/Kit";

export function mapRequestToKitInput(body: any): KitInput {
  validaKit(body);

  const itens: KitItemInput[] = body.itens.map((item: any, index: number) => {
    validaKitItem(item, index);
    return {
      produtoId: item.produtoId,
      quantidade: item.quantidade
    };
  });

  return {
    nome: body.nome,
    descricao: body.descricao,
    precoVenda: body.precoVenda,
    itens
  };
}

function validaKit(body: any): void {
  if (!body.nome || typeof body.nome !== "string") {
    throw new BusinessError("O campo 'nome' é obrigatório e deve ser uma string.");
  }
  if (typeof body.precoVenda !== "number" || body.precoVenda <= 0) {
    throw new BusinessError("O campo 'precoVenda' é obrigatório e deve ser um número maior que zero.");
  }
  if (!Array.isArray(body.itens) || body.itens.length === 0) {
    throw new BusinessError("O kit deve ter pelo menos um item.");
  }
}

function validaKitItem(item: any, index: number): void {
  if (typeof item.produtoId !== "number" || item.produtoId <= 0) {
    throw new BusinessError(`O item ${index + 1} precisa ter 'produtoId' válido.`);
  }
  if (typeof item.quantidade !== "number" || item.quantidade <= 0) {
    throw new BusinessError(`O item ${index + 1} precisa ter 'quantidade' maior que zero.`);
  }
}