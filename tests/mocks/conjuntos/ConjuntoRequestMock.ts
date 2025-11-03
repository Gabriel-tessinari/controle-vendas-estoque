import { Aleatorios } from "../../../src/shared/utils/aleatorio";
import { ConjuntoItemRequestMock } from "./ConjuntoItemRequestMock";

export class ConjuntoRequestMock {
  static criar(sobrescreve = {}) {
    return {
      nome: Aleatorios.getString("Conjunto"),
      descricao: Aleatorios.getString(),
      precoVenda: Aleatorios.getFloat(),
      itens: ConjuntoItemRequestMock.criarLista(),
      ...sobrescreve
    }
  }

  static criarLista(qtd = 3) {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
