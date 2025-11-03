import { Conjunto } from "../../../src/conjuntos/models/Conjunto";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";
import { ConjuntoItemMock } from "./ConjuntoItemMock";

export class ConjuntoMock {
  static criar(sobrescreve = {}): Conjunto {
    return {
      id: Aleatorios.getInt(),
      nome: Aleatorios.getString("Conjunto"),
      precoCompra: Aleatorios.getFloat(),
      precoVenda: Aleatorios.getFloat(),
      descricao: Aleatorios.getString(),
      ativo: Aleatorios.getBoolean(),
      itens: ConjuntoItemMock.criarLista(),
      ...sobrescreve
    }
  }

  static criarLista(qtd = 3): Conjunto[] {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
