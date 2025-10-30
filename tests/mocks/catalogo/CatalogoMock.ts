import { Catalogo } from "../../../src/catalogo/models/Catalogo";
import { ConjuntoMock } from "../conjuntos/ConjuntoMock";
import { ProdutoMock } from "../produtos/ProdutoMock";

export class CatalogoMock {
  static criar(sobrescreve = {}): Catalogo {
    return {
      produtos: ProdutoMock.criarListaDeProdutos(),
      conjuntos: ConjuntoMock.criarLista(),
      ...sobrescreve
    }
  }
}