import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class ProdutoVariacaoDBMock {
  static criarProdutoVariacaoDB(sobrescreve = {}) {
    return {
      id: Aleatorios.getInt(),
      produto_id: Aleatorios.getInt(),
      descricao: Aleatorios.getString("Variação"),
      preco_compra: Aleatorios.getFloat(),
      preco_venda: Aleatorios.getFloat(),
      estoque: Aleatorios.getInt(),
      ...sobrescreve
    }
  }
}
