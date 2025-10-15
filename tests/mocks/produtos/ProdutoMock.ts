import { Produto } from "../../../src/produtos/models/Produto";
import { ProdutoVariacao } from "../../../src/produtos/models/ProdutoVariacao";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class ProdutoMock {
  static criarProduto(sobrescreve = {}): Produto {
    return {
      id: Aleatorios.getInt(),
      nome: Aleatorios.getString("Produto"),
      categoriaId: Aleatorios.getInt(),
      variacoes: this.criarListaDeProdutoVariacoes(),
      ...sobrescreve
    }
  }

  static criarListaDeProdutos(qtd = 3): Produto[] {
    return Array.from({ length: qtd }, () => this.criarProduto());
  }

  static criarProdutoVariacao(sobrescreve = {}): ProdutoVariacao {
    return {
      id: Aleatorios.getInt(),
      produtoId: Aleatorios.getInt(),
      descricao: Aleatorios.getString("Variação"),
      precoCompra: Aleatorios.getFloat(),
      precoVenda: Aleatorios.getFloat(),
      estoque: Aleatorios.getInt(),
      ...sobrescreve
    }
  }

  static criarListaDeProdutoVariacoes(qtd = 3): ProdutoVariacao[] {
    return Array.from({ length: qtd }, () => this.criarProdutoVariacao());
  }
}
