import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class ProdutoRequestMock {
  static criarProdutoRequest(sobrescreve = {}) {
    return {
      nome: Aleatorios.getString("Produto"),
      categoriaId: Aleatorios.getInt(),
      precoVenda: Aleatorios.getFloat(),
      variacoes: this.criarListaDeProdutoVariacoesRequestMock(),
      ...sobrescreve
    }
  }

  static criarListaDeProdutosRequest(qtd = 3) {
    return Array.from({ length: qtd }, () => this.criarProdutoRequest());
  }

  static criarProdutoVariacaoRequest(sobrescreve = {}) {
    return {
      descricao: Aleatorios.getString("Variação"),
      ...sobrescreve
    }
  }

  static criarListaDeProdutoVariacoesRequestMock(qtd = 3) {
    return Array.from({ length: qtd }, () => this.criarProdutoVariacaoRequest());
  }
}
