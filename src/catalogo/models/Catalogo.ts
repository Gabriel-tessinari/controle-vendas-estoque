import { Conjunto } from "../../conjuntos/models/Conjunto";
import { Produto } from "../../produtos/models/Produto";

export interface Catalogo {
  produtos: Produto[];
  conjuntos: Conjunto[];
}