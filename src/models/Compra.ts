export type StatusPagamento = "ABERTO" | "PAGO_PARCIAL" | "PAGO_TOTAL";
export type StatusParcela = "NAO_PAGO" | "PAGO";

export type FormaPagamento = "PIX" | "CREDITO" | "DEBITO" | "DINHEIRO";
export const FORMAS_PAGAMENTO: FormaPagamento[] = ["PIX", "CREDITO", "DEBITO", "DINHEIRO"];

export interface CompraInput {
  fornecedorId: number;
  dataCompra: string;
  frete: number;
  outrasTaxas: number;
  itens: CompraItemInput[];
  pagamentos: CompraPagamentoInput[];
  statusPagamento?: StatusPagamento;
}

export interface CompraItemInput {
  produtoVariacaoId: number;
  quantidade: number;
  precoUnitario: number;
}

export interface CompraPagamentoInput {
  dataPagamento: string;
  valorPago: number;
  formaPagamento: FormaPagamento;
  statusParcela: StatusParcela;
  observacao?: string;
}
