import { ComprasService } from "../../../src/services/comprasService";
import * as produtosRepo from "../../../src/produtos/repositories/produtosRepository";
import * as comprasRepo from "../../../src/repositories/comprasRepository";
import { BusinessError } from "../../../src/shared/errors/BusinessError";
import { CompraInput, CompraPagamentoInput, FormaPagamento } from "../../../src/models/Compra";

jest.mock("../../../src/produtos/repositories/produtosRepository");
jest.mock("../../../src/repositories/comprasRepository");

describe("ComprasService", () => {
  let compraInput: CompraInput;
  let valorPago: number;
  let quantidadeParcelas: number;
  let formaPagamento: FormaPagamento;

  beforeEach(() => {
    valorPago = 0;
    quantidadeParcelas = 1;
    formaPagamento = 'PIX';
    compraInput = {
      fornecedorId: 1,
      dataCompra: "2025-02-18",
      frete: 0,
      outrasTaxas: 0,
      itens: [
        { produtoVariacaoId: 1, quantidade: 10, precoUnitario: 10 },
        { produtoVariacaoId: 2, quantidade: 1, precoUnitario: 18.02 }
      ],
      pagamentos: []
    };

    jest.clearAllMocks();
  });

  describe("postCompra", () => {
    it("deve lançar BusinessError se valor pago for negativo", async () => {
      valorPago = -1;

      await expect(ComprasService.postCompra(valorPago, quantidadeParcelas, formaPagamento, compraInput))
        .rejects
        .toThrow(new BusinessError("O valor pago não pode ser negativo."));

      expect(produtosRepo.variacoesExistem).not.toHaveBeenCalled();
      expect(comprasRepo.insertCompraComItensEPagamentos).not.toHaveBeenCalled();
    });

    it("deve lançar BusinessError se quantidade de parcelas for menor que 1", async () => {
      quantidadeParcelas = 0;

      await expect(ComprasService.postCompra(valorPago, quantidadeParcelas, formaPagamento, compraInput))
        .rejects
        .toThrow(new BusinessError("A quantidade de parcelas deve ser no mínimo 1."));

      expect(produtosRepo.variacoesExistem).not.toHaveBeenCalled();
      expect(comprasRepo.insertCompraComItensEPagamentos).not.toHaveBeenCalled();
    });

    it("deve lançar BusinessError se alguma variação de produto não existir", async () => {
      (produtosRepo.variacoesExistem as jest.Mock)
        .mockResolvedValue(false);

      await expect(ComprasService.postCompra(valorPago, quantidadeParcelas, formaPagamento, compraInput))
        .rejects
        .toThrow(new BusinessError("Uma ou mais variações de produto não existem."));

      expect(produtosRepo.variacoesExistem).toHaveBeenCalled();
      expect(comprasRepo.insertCompraComItensEPagamentos).not.toHaveBeenCalled();
    });

    it("deve criar compra com um pagamento PAGO na lista", async () => {
      (produtosRepo.variacoesExistem as jest.Mock)
        .mockResolvedValue(true);

      (comprasRepo.insertCompraComItensEPagamentos as jest.Mock)
        .mockResolvedValue(18);

      valorPago = compraInput.itens.reduce(
        (soma, item) => soma + item.precoUnitario * item.quantidade,
        0
      );

      const result = await ComprasService.postCompra(
        valorPago, quantidadeParcelas, formaPagamento, compraInput
      );

      let expectedPagamentos: CompraPagamentoInput[] = [
        {
          dataPagamento: compraInput.dataCompra,
          formaPagamento: formaPagamento,
          valorPago: valorPago,
          statusParcela: 'PAGO'
        }
      ]

      expect(produtosRepo.variacoesExistem).toHaveBeenCalled();
      expect(comprasRepo.insertCompraComItensEPagamentos).toHaveBeenCalledWith(compraInput);
      expect(compraInput.statusPagamento).toBe('PAGO_TOTAL');
      expect(compraInput.pagamentos).toStrictEqual(expectedPagamentos);
      expect(result).toBe(18);
    });

    it("deve criar compra com dois pagamentos na lista um PAGO e outro NAO_PAGO", async () => {
      (produtosRepo.variacoesExistem as jest.Mock)
        .mockResolvedValue(true);

      (comprasRepo.insertCompraComItensEPagamentos as jest.Mock)
        .mockResolvedValue(18);

      const valorTotal: number = compraInput.itens.reduce(
        (soma, item) => soma + item.precoUnitario * item.quantidade,
        0
      );

      valorPago = valorTotal / 2;

      const result = await ComprasService.postCompra(
        valorPago, quantidadeParcelas, formaPagamento, compraInput
      );

      let expectedDate = new Date(compraInput.dataCompra);
      expectedDate.setMonth(expectedDate.getMonth() + 1);
      let expectedDateString: string = expectedDate.toISOString().split("T")[0];

      let expectedPagamentos: CompraPagamentoInput[] = [
        {
          dataPagamento: compraInput.dataCompra,
          formaPagamento: formaPagamento,
          valorPago: valorPago,
          statusParcela: 'PAGO'
        },
        {
          dataPagamento: expectedDateString,
          formaPagamento: formaPagamento,
          valorPago: valorPago,
          statusParcela: 'NAO_PAGO'
        }
      ];

      expect(produtosRepo.variacoesExistem).toHaveBeenCalled();
      expect(comprasRepo.insertCompraComItensEPagamentos).toHaveBeenCalledWith(compraInput);
      expect(compraInput.statusPagamento).toBe('PAGO_PARCIAL');
      expect(compraInput.pagamentos).toStrictEqual(expectedPagamentos)
      expect(result).toBe(18);
    });

    it("deve criar compra com dois pagamentos NAO_PAGO na lista", async () => {
      (produtosRepo.variacoesExistem as jest.Mock)
        .mockResolvedValue(true);

      (comprasRepo.insertCompraComItensEPagamentos as jest.Mock)
        .mockResolvedValue(18);

      quantidadeParcelas = 2;

      const valorTotal: number = compraInput.itens.reduce(
        (soma, item) => soma + item.precoUnitario * item.quantidade,
        0
      );

      const expectedValorPago: number = valorTotal / 2;

      const result = await ComprasService.postCompra(
        valorPago, quantidadeParcelas, formaPagamento, compraInput
      );

      let expectedDate = new Date(compraInput.dataCompra);
      expectedDate.setMonth(expectedDate.getMonth() + 1);
      let expectedDateString1: string = expectedDate.toISOString().split("T")[0];
      expectedDate.setMonth(expectedDate.getMonth() + 1);
      let expectedDateString2: string = expectedDate.toISOString().split("T")[0];

      let expectedPagamentos: CompraPagamentoInput[] = [
        {
          dataPagamento: expectedDateString1,
          formaPagamento: formaPagamento,
          valorPago: expectedValorPago,
          statusParcela: 'NAO_PAGO'
        },
        {
          dataPagamento: expectedDateString2,
          formaPagamento: formaPagamento,
          valorPago: expectedValorPago,
          statusParcela: 'NAO_PAGO'
        }
      ];

      expect(produtosRepo.variacoesExistem).toHaveBeenCalled();
      expect(comprasRepo.insertCompraComItensEPagamentos).toHaveBeenCalledWith(compraInput);
      expect(compraInput.statusPagamento).toBe('ABERTO');
      expect(compraInput.pagamentos).toStrictEqual(expectedPagamentos)
      expect(result).toBe(18);
    });
  });
});
