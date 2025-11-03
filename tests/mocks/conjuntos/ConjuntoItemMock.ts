import { ConjuntoItem } from "../../../src/conjuntos/models/ConjuntoItem";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class ConjuntoItemMock {
  static criar(sobrescreve = {}): ConjuntoItem {
    return {
      id: Aleatorios.getInt(),
      produtoId: Aleatorios.getInt(),
      conjuntoId: Aleatorios.getInt(),
      quantidade: Aleatorios.getInt(),
      ...sobrescreve
    }
  }

  static criarLista(qtd = 3): ConjuntoItem[] {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
