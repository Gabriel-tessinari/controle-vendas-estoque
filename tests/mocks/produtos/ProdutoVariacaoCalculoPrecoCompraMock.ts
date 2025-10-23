import { ProdutoVariacaoCalculoPrecoCompra } from "../../../src/produtos/models/ProdutoVariacaoCalculoPrecoCompra";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class ProdutoVariacaoCalculoPrecoCompraMock {
  static criar(sobrescreve = {}): ProdutoVariacaoCalculoPrecoCompra {
    return {
      estoque: Aleatorios.getInt(),
      precoCompra: Aleatorios.getFloat(),
      ...sobrescreve
    }
  }
}
