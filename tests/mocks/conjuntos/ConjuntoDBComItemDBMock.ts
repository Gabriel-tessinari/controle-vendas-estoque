import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class ConjuntoDBComItemDBMock {
  static criar(sobrescreve = {}) {
    const conjuntoId = Aleatorios.getInt();

    return {
      id: conjuntoId,
      nome: Aleatorios.getString("Conjunto"),
      preco_compra: Aleatorios.getFloat(),
      preco_venda: Aleatorios.getFloat(),
      descricao: Aleatorios.getString(),
      ativo: Aleatorios.getBoolean(),
      item_id: Aleatorios.getInt(),
      produto_id: Aleatorios.getInt(),
      conjunto_id: conjuntoId,
      quantidade: Aleatorios.getInt(),
      ...sobrescreve,
    };
  }

  static criarLista(qtd = 3) {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
