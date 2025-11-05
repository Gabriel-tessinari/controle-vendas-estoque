import { Categoria } from "../../../src/categorias/models/Categoria";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class CategoriaMock {
  static criar(sobrescreve = {}): Categoria {
    return {
      id: Aleatorios.getInt(),
      nome: Aleatorios.getString("Categoria"),
      ...sobrescreve,
    };
  }

  static criarLista(qtd = 3): Categoria[] {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
