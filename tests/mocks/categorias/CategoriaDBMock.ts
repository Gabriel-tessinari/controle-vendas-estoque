import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class CategoriaDBMock {
  static criar(sobrescreve = {}) {
    return {
      id: Aleatorios.getInt(),
      nome: Aleatorios.getString("Categoria"),
      ...sobrescreve,
    };
  }

  static criarLista(qtd = 3) {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
