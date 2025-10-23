import { Kit } from "../../models/Kit";
import { Produto } from "../../produtos/models/Produto";

export interface Catalogo {
  produtos: Produto[];
  kits: Kit[];
}