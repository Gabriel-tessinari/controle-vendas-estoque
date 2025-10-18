import { CompraItemInput } from "./CompraItemInput";
import { CompraPagamentoInput } from "./CompraPagamentoInput";
import { StatusPagamento } from "./types/StatusPagamento";

export interface CompraInput {
  fornecedorId: number;
  dataCompra: string;
  frete: number;
  outrasTaxas: number;
  itens: CompraItemInput[];
  pagamentos: CompraPagamentoInput[];
  statusPagamento: StatusPagamento;
}