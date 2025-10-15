import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class ProdutoDBMock {
  static criarProdutoDB(sobrescreve = {}) {
    return {
      id: Aleatorios.getInt(),
      nome: Aleatorios.getString("Produto"),
      categoria_id: Aleatorios.getInt(),
      ...sobrescreve
    }
  }
}
