import { Conjunto } from "../../conjuntos/models/Conjunto";
import { Produto } from "../../produtos/models/Produto";
import { Catalogo } from "../models/Catalogo";

export function produtosEConjuntosEmCatalogo(produtos: Produto[], conjuntos: Conjunto[]): Catalogo {
  return { produtos, conjuntos };
}