import * as produtosRepo from "../produtos/repositories/produtosRepository";
import * as comprasRepo from "../repositories/comprasRepository";
import { BusinessError } from "../shared/errors/BusinessError";
import { CompraInput, CompraPagamentoInput, FormaPagamento, FORMAS_PAGAMENTO } from "../models/Compra";
import { validar } from "../shared/utils/validar";
import { calcularVencimento } from "../shared/utils/data";

export class ComprasService {
  static async postCompra(
    valorPago: number,
    quantidadeParcelas: number,
    formaPagamento: FormaPagamento,
    compra: CompraInput
  ): Promise<number> {
    validar(valorPago == null || isNaN(valorPago), "O valor pago é obrigatório e deve ser um número.");
    validar(valorPago < 0, "O valor pago não pode ser negativo.");

    quantidadeParcelas = quantidadeParcelas ?? 1;
    validar(quantidadeParcelas < 1, "A quantidade de parcelas deve ser no mínimo 1.");

    validar(!FORMAS_PAGAMENTO.includes(formaPagamento), "Forma de pagamento inválida.");

    const variacaoIds: number[] = [];
    let valorItens: number = 0;

    for (const item of compra.itens) {
      variacaoIds.push(item.produtoVariacaoId);
      valorItens += item.precoUnitario * item.quantidade;
    }

    const variacoesExistem: boolean = await produtosRepo.variacoesExistem(variacaoIds);

    if (!variacoesExistem) {
      throw new BusinessError("Uma ou mais variações de produto não existem.");
    }

    const valorTotal: number = valorItens + compra.frete + compra.outrasTaxas;

    const pagamentos: CompraPagamentoInput[] = gerarPagamentos(
      valorTotal, valorPago, quantidadeParcelas, formaPagamento, compra.dataCompra
    );

    compra.statusPagamento = 'ABERTO';
    if (valorPago >= valorTotal) {
      compra.statusPagamento = "PAGO_TOTAL";
    } else if (valorPago > 0) {
      compra.statusPagamento = 'PAGO_PARCIAL';
    }

    compra.pagamentos = pagamentos;
    return await comprasRepo.insertCompraComItensEPagamentos(compra);
  }
}

function gerarPagamentos(
  valorTotal: number,
  valorPago: number,
  quantidadeParcelas: number,
  formaPagamento: FormaPagamento,
  dataCompra: string
): CompraPagamentoInput[] {
  const pagamentos: CompraPagamentoInput[] = [];

  if (valorPago >= valorTotal) {
    pagamentos.push({
      dataPagamento: dataCompra,
      valorPago: valorTotal,
      formaPagamento,
      statusParcela: "PAGO",
    });
    return pagamentos;
  }

  const valorRestante: number = valorTotal - valorPago;
  const parcelas: number = quantidadeParcelas || 1;
  const valorParcela: number = parcelas > 1
    ? valorRestante / parcelas
    : valorRestante;

  if (valorPago > 0) {
    pagamentos.push({
      dataPagamento: dataCompra,
      valorPago,
      formaPagamento,
      statusParcela: "PAGO",
    });
  }

  for (let i = 1; i <= parcelas; i++) {
    pagamentos.push({
      dataPagamento: calcularVencimento(dataCompra, i),
      valorPago: parseFloat(valorParcela.toFixed(2)),
      formaPagamento,
      statusParcela: "NAO_PAGO",
    });
  }

  return pagamentos;
}
