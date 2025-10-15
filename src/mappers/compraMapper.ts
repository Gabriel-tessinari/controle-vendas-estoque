import { BusinessError } from "../shared/errors/BusinessError";
import { CompraInput, CompraItemInput } from "../models/Compra";

export const mapRequestToCompraInput = (body: any): CompraInput => {
  validaCompra(body);

  const itens: CompraItemInput[] = body.itens.map((item: any, index: number): CompraItemInput => {
    validaCompraItem(item, index);
    return {
      produtoVariacaoId: item.produtoVariacaoId,
      quantidade: item.quantidade,
      precoUnitario: item.precoUnitario,
    };
  });

  return {
    fornecedorId: body.fornecedorId,
    dataCompra: body.data,
    frete: body.frete ?? 0,
    outrasTaxas: body.outrasTaxas ?? 0,
    pagamentos: [],
    itens
  };
};

function validaCompra(body: any): void {
  if (typeof body.fornecedorId !== "number" || body.fornecedorId <= 0) {
    throw new BusinessError("O campo 'fornecedorId' é obrigatório e deve ser um número válido.");
  }

  if (!body.data) {
    throw new BusinessError("O campo 'data' é obrigatório.");
  }

  if (!Array.isArray(body.itens) || body.itens.length === 0) {
    throw new BusinessError("A compra deve ter pelo menos um item.");
  }
}

function validaCompraItem(item: any, index: number): void {
  if (typeof item.produtoVariacaoId !== "number" || item.produtoVariacaoId <= 0) {
    throw new BusinessError(`O item ${index + 1} precisa ter 'produtoVariacaoId' válido.`);
  }

  if (typeof item.quantidade !== "number" || item.quantidade <= 0) {
    throw new BusinessError(`O item ${index + 1} precisa ter 'quantidade' maior que zero.`);
  }

  if (typeof item.precoUnitario !== "number" || item.precoUnitario <= 0) {
    throw new BusinessError(`O item ${index + 1} precisa ter 'precoUnitario' maior que zero.`);
  }
}
