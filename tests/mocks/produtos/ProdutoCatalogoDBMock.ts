import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class ProdutoCatalogoDBMock {
  static criar(sobrescreve = {}) {
    const produtoId = Aleatorios.getInt();

    return {
      produto_id: produtoId,
      produto_nome: Aleatorios.getString("Produto"),
      produto_categoria_id: Aleatorios.getInt(),
      variacao_id: Aleatorios.getInt(),
      variacao_produto_id: produtoId,
      variacao_descricao: Aleatorios.getString(),
      variacao_preco_compra: Aleatorios.getFloat(),
      variacao_preco_venda: Aleatorios.getFloat(),
      variacao_estoque: Aleatorios.getInt(),
      ...sobrescreve
    }
  }

  static criarLista(qtd = 3) {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
