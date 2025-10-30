import { ConjuntoInput } from "../../../src/conjuntos/models/ConjuntoInput";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";
import { ConjuntoItemInputMock } from "./ConjuntoItemInputMock";

export class ConjuntoInputMock {
  static criar(sobrescreve = {}): ConjuntoInput {
    return {
      nome: Aleatorios.getString("Conjunto"),
      precoVenda: Aleatorios.getFloat(),
      descricao: Aleatorios.getString(),
      itens: ConjuntoItemInputMock.criarLista(),
      ...sobrescreve
    }
  }

  static criarLista(qtd = 3): ConjuntoInput[] {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
