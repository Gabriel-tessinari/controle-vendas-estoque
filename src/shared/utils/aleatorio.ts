import { FormaPagamento, FORMAS_PAGAMENTO } from "../../compras/models/types/FormaPagamento";
import { StatusPagamento, STATUS_PAGAMENTO } from "../../compras/models/types/StatusPagamento";
import { StatusParcela, STATUS_PARCELA } from "../../compras/models/types/StatusParcela";

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
}