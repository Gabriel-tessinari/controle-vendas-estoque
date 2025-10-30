import { FORMAS_PAGAMENTO, FormaPagamento } from "../../compras/models/types/FormaPagamento";
import { STATUS_PAGAMENTO, StatusPagamento } from "../../compras/models/types/StatusPagamento";
import { STATUS_PARCELA, StatusParcela } from "../../compras/models/types/StatusParcela";
import { MOVIMENTACAO_ORIGEM, MovimentacaoOrigem } from "../../movimentacoes/models/types/MovimentacaoOrigem";
import { MOVIMENTACAO_TIPO, MovimentacaoTipo } from "../../movimentacoes/models/types/MovimentacaoTipo";

export class Aleatorios {
  static getString(prefix = 'Item', length = 5): string {
    const random: string = Math.random().toString(36).substring(2, 2 + length);
    return `${prefix}-${random}`;
  }

  static getInt(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  static getFloat(min = 10, max = 200, decimals = 2): number {
    const num: number = Math.random() * (max - min) + min;
    return parseFloat(num.toFixed(decimals));
  }

  static getBoolean(): boolean {
    return Math.random() >= 0.5;
  }

  static getDataString(inicio = '2024-01-01', fim = '2025-12-31'): string {
    const start: number = new Date(inicio).getTime();
    const end: number = new Date(fim).getTime();
    const randomTime: number = start + Math.random() * (end - start);
    const randomDate = new Date(randomTime);
    return randomDate.toISOString().split('T')[0];
  }

  static getFormaPagamento(): FormaPagamento {
    const index: number = Math.floor(Math.random() * FORMAS_PAGAMENTO.length);
    return FORMAS_PAGAMENTO[index];
  }

  static getStatusPagamento(): StatusPagamento {
    const index: number = Math.floor(Math.random() * STATUS_PAGAMENTO.length);
    return STATUS_PAGAMENTO[index];
  }

  static getStatusParcela(): StatusParcela {
    const index: number = Math.floor(Math.random() * STATUS_PARCELA.length);
    return STATUS_PARCELA[index];
  }

  static getMovimentacaoTipo(): MovimentacaoTipo {
    const index: number = Math.floor(Math.random() * MOVIMENTACAO_TIPO.length);
    return MOVIMENTACAO_TIPO[index];
  }

  static getMovimentacaoOrigem(): MovimentacaoOrigem {
    const index: number = Math.floor(Math.random() * MOVIMENTACAO_ORIGEM.length);
    return MOVIMENTACAO_ORIGEM[index];
  }
}