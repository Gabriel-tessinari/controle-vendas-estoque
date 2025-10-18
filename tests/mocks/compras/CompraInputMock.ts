import { CompraInput } from "../../../src/compras/models/CompraInput";
import { CompraItemInput } from "../../../src/compras/models/CompraItemInput";
import { CompraPagamentoInput } from "../../../src/compras/models/CompraPagamentoInput";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class CompraInputMock {
  static criarCompraInput(sobrescreve = {}): CompraInput {
    return {
      fornecedorId: Aleatorios.getInt(),
      dataCompra: Aleatorios.getDataString(),
      frete: Aleatorios.getFloat(),
      outrasTaxas: Aleatorios.getFloat(),
      itens: this.criarListaDeCompraItemInput(),
      statusPagamento: Aleatorios.getStatusPagamento(),
      pagamentos: this.criarListaDeCompraPagamentoInput(),
      ...sobrescreve
    }
  }

  static criarCompraItemInput(sobrescreve = {}): CompraItemInput {
    return {
      produtoVariacaoId: Aleatorios.getInt(),
      quantidade: Aleatorios.getInt(),
      precoUnitario: Aleatorios.getFloat(),
      ...sobrescreve
    }
  }

  static criarListaDeCompraItemInput(qtd = 3): CompraItemInput[] {
    return Array.from({ length: qtd }, () => this.criarCompraItemInput());
  }

  static criarCompraPagamentoInput(sobrescreve = {}): CompraPagamentoInput {
    return {
      dataPagamento: Aleatorios.getDataString(),
      valorPago: Aleatorios.getFloat(),
      formaPagamento: Aleatorios.getFormaPagamento(),
      statusParcela: Aleatorios.getStatusParcela(),
      ...sobrescreve
    }
  }

  static criarListaDeCompraPagamentoInput(qtd = 3): CompraPagamentoInput[] {
    return Array.from({ length: qtd }, () => this.criarCompraPagamentoInput());
  }
}