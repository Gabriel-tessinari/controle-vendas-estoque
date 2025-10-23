import { Kit } from "../../models/Kit";
import { Produto } from "../../produtos/models/Produto";
import { Catalogo } from "../models/Catalogo";

export async function listarCatalogo(pesquisar: string): Promise<Catalogo> {
  const produtos: Produto[] = [];
  const kits: Kit[] = [];

  return { produtos, kits };
}