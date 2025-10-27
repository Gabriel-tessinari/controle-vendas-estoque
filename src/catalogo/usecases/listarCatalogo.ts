import { selectConjuntosComItens } from "../../conjuntos/repositories/conjuntosRepository";
import { selectProdutosComVariacoes } from "../../produtos/repositories/produtosRepository";
import { produtosEKitsEmCatalogo } from "../mappers/produtosEKitsEmCatalogo";
import { Catalogo } from "../models/Catalogo";

export async function listarCatalogo(pesquisar: string): Promise<Catalogo> {
  const produtos = await selectProdutosComVariacoes(pesquisar);
  const kits = await selectConjuntosComItens(pesquisar);

  return produtosEKitsEmCatalogo(produtos, kits);
}