import { validar } from "../../shared/utils/validar";
import { ConjuntoInput } from "../models/ConjuntoInput";
import { ConjuntoItemInput } from "../models/ConjuntoItemInput";

export function reqEmConjuntoInput(body: any): ConjuntoInput {
  validaConjunto(body);

  const itens: ConjuntoItemInput[] = body.itens.map((item: any, index: number) => {
    validaConjuntoItem(item, index);
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

function validaConjunto(body: any): void {
  validar(
    !body.nome || typeof body.nome !== "string",
    'Conjunto: nome inválido.'
  );

  validar(
    typeof body.precoVenda !== "number" || body.precoVenda <= 0,
    'Conjunto: preço de venda inválido.'
  );

  validar(
    !Array.isArray(body.itens) || body.itens.length === 0,
    'A lista de itens deve conter ao menos um item.'
  );
}

function validaConjuntoItem(item: any, index: number): void {
  validar(
    typeof item.produtoId !== "number" || item.produtoId <= 0,
    `Conjunto - Item #${index + 1}: id do produto inválido.`
  );

  validar(
    typeof item.quantidade !== "number" || item.quantidade <= 0,
    `Conjunto - Item #${index + 1}: quantidade inválida.`
  );
}
