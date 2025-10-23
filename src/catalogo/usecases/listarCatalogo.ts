import { Kit } from "../../models/Kit";
import { Produto } from "../../produtos/models/Produto";
import { selectProdutosComVariacoes } from "../../produtos/repositories/produtosRepository";
import { produtosEKitsEmCatalogo } from "../mappers/produtosEKitsEmCatalogo";
import { Catalogo } from "../models/Catalogo";

export async function listarCatalogo(pesquisar: string): Promise<Catalogo> {
  const produtos: Produto[] = await selectProdutosComVariacoes(pesquisar);
  const kits: Kit[] = [];

  return produtosEKitsEmCatalogo(produtos, kits);
}