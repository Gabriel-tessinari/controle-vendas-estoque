import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class CompraRequestMock {
  static criarCompraRequest(sobrescreve = {}) {
    return {
      fornecedorId: Aleatorios.getInt(),
      data: Aleatorios.getDataString(),
      frete: Aleatorios.getFloat(),
      outrasTaxas: Aleatorios.getFloat(),
      itens: this.criarListaDeCompraItemRequest(),
      formaPagamento: Aleatorios.getFormaPagamento(),
      valorPago: Aleatorios.getFloat(),
      quantidadeParcelas: Aleatorios.getInt(),
      ...sobrescreve
    }
  }

  static criarCompraItemRequest(sobrescreve = {}) {
    return {
      produtoVariacaoId: Aleatorios.getInt(),
      quantidade: Aleatorios.getInt(),
      precoUnitario: Aleatorios.getFloat(),
      ...sobrescreve
    }
  }

  static criarListaDeCompraItemRequest(qtd = 3) {
    return Array.from({ length: qtd }, () => this.criarCompraItemRequest());
  }
}