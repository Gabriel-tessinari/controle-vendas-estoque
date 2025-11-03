import { produtosExistem } from "../../produtos/repositories/produtosRepository";
import { executarTransacao } from "../../shared/utils/executarTransacao";
import { validar } from "../../shared/utils/validar";
import { Conjunto } from "../models/Conjunto";
import { ConjuntoInput } from "../models/ConjuntoInput";
import { ConjuntoItem } from "../models/ConjuntoItem";
import { ConjuntoItemInput } from "../models/ConjuntoItemInput";
import { insertConjuntoItem } from "../repositories/conjuntosItensRepository";
import { insertConjunto } from "../repositories/conjuntosRepository";

export async function cadastrarConjuntoComItens(conjunto: ConjuntoInput): Promise<Conjunto> {
  return executarTransacao(async (client) => {
    await validarItens(conjunto.itens);

    const conjuntoCadastrado = await insertConjunto(conjunto, client);

    const itensCadastrados: ConjuntoItem[] = [];

    for (const item of conjunto.itens) {
      const itemCadastrado = await insertConjuntoItem(conjuntoCadastrado.id, item, client);
      itensCadastrados.push(itemCadastrado);
    }

    conjuntoCadastrado.itens = itensCadastrados;

    return conjuntoCadastrado;
  });
}

async function validarItens(itens: ConjuntoItemInput[]): Promise<void> {
  const produtosIds = itens.map(i => i.produtoId);
  const existem = await produtosExistem(produtosIds);

  validar(!existem, "Um ou mais produtos não existem.");
}
