import { MovimentacaoInput } from "../../../src/movimentacoes/models/MovimentacaoInput";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class MovimentacaoInputMock {
  static criar(sobrescreve = {}): MovimentacaoInput {
    return {
      produtoVariacaoId: Aleatorios.getInt(),
      referenciaId: Aleatorios.getInt(),
      data: Aleatorios.getDataString(),
      quantidade: Aleatorios.getInt(),
      observacao: Aleatorios.getString("Observação"),
      origem: Aleatorios.getMovimentacaoOrigem(),
      tipo: Aleatorios.getMovimentacaoTipo(),
      ...sobrescreve
    }
  }
}