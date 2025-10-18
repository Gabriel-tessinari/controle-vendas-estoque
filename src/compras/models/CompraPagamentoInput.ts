import { FormaPagamento } from "./types/FormaPagamento";
import { StatusParcela } from "./types/StatusParcela";

export interface CompraPagamentoInput {
  dataPagamento: string;
  valorPago: number;
  formaPagamento: FormaPagamento;
  statusParcela: StatusParcela;
  observacao?: string;
}