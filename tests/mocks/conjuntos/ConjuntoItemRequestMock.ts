import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class ConjuntoItemRequestMock {
  static criar(sobrescreve = {}) {
    return {
      produtoId: Aleatorios.getInt(),
      quantidade: Aleatorios.getInt(),
      ...sobrescreve
    }
  }

  static criarLista(qtd = 3) {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
