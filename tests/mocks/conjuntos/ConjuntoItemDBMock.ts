import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class ConjuntoItemDBMock {
  static criar(sobrescreve = {}) {
    return {
      id: Aleatorios.getInt(),
      conjunto_id: Aleatorios.getInt(),
      produto_id: Aleatorios.getInt(),
      quantidade: Aleatorios.getInt(),
      ...sobrescreve
    }
  }

  static criarLista(qtd = 3) {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
