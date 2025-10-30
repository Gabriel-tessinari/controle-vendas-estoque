import { ConjuntoItemInput } from "../../../src/conjuntos/models/ConjuntoItemInput";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class ConjuntoItemInputMock {
  static criar(sobrescreve = {}): ConjuntoItemInput {
    return {
      produtoId: Aleatorios.getInt(),
      quantidade: Aleatorios.getInt(),
      ...sobrescreve
    }
  }

  static criarLista(qtd = 3): ConjuntoItemInput[] {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
