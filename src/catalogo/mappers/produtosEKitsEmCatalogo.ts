import { Kit } from "../../models/Kit";
import { Produto } from "../../produtos/models/Produto";
import { Catalogo } from "../models/Catalogo";

export function produtosEKitsEmCatalogo(produtos: Produto[], kits: Kit[]): Catalogo {
  return { produtos, kits };
}