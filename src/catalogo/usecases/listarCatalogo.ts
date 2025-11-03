import { selectConjuntosComItens } from "../../conjuntos/repositories/conjuntosRepository";
import { selectProdutosComVariacoes } from "../../produtos/repositories/produtosRepository";
import { produtosEConjuntosEmCatalogo } from "../mappers/produtosEConjuntosEmCatalogo";
import { Catalogo } from "../models/Catalogo";

export async function listarCatalogo(pesquisar: string): Promise<Catalogo> {
  const produtos = await selectProdutosComVariacoes(pesquisar);
  const conjuntos = await selectConjuntosComItens(pesquisar);

  return produtosEConjuntosEmCatalogo(produtos, conjuntos);
}