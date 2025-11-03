import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class ConjuntoDBMock {
  static criar(sobrescreve = {}) {
    return {
      id: Aleatorios.getInt(),
      nome: Aleatorios.getString("Conjunto"),
      preco_compra: Aleatorios.getFloat(),
      preco_venda: Aleatorios.getFloat(),
      descricao: Aleatorios.getString(),
      ativo: Aleatorios.getBoolean(),
      ...sobrescreve
    }
  }

  static criarLista(qtd = 3) {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
