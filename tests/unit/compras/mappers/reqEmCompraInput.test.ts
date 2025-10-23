import { reqEmCompraInput } from "../../../../src/compras/mappers/reqEmCompraInput";
import { CompraRequestMock } from "../../../mocks/compras/CompraRequestMock";
import { BusinessError } from '../../../../src/shared/errors/BusinessError';

describe('reqEmCompraInput', () => {
  describe('mapRequestToCompraInput', () => {
    it('deve mapear corretamente o request para CompraInput', () => {
      const body: any = CompraRequestMock.criarCompraRequest({ valorPago: 0 });
      const compraInput = reqEmCompraInput(body);

      expect(compraInput.fornecedorId).toBe(body.fornecedorId);
      expect(compraInput.dataCompra).toBe(body.data);
      expect(compraInput.frete).toBe(body.frete);
      expect(compraInput.outrasTaxas).toBe(body.outrasTaxas);
      expect(compraInput.itens).toStrictEqual(body.itens);
      expect(compraInput.statusPagamento).toBe("ABERTO");
      expect(compraInput.pagamentos).toHaveLength(body.quantidadeParcelas);
    });

    it("deve lançar erro se fornecedorId for inválido", () => {
      const body: any = CompraRequestMock.criarCompraRequest({ fornecedorId: 0 });

      expect(() => reqEmCompraInput(body)).toThrow(BusinessError);
      expect(() => reqEmCompraInput(body))
        .toThrow("Compra: id de fornecedor inválido.");
    });

    it("deve lançar erro se data for inválida", () => {
      const body: any = CompraRequestMock.criarCompraRequest({ data: undefined });

      expect(() => reqEmCompraInput(body)).toThrow(BusinessError);
      expect(() => reqEmCompraInput(body))
        .toThrow("Compra: data inválida.");
    });

    it("deve lançar erro se lista de itens vazia", () => {
      const body: any = CompraRequestMock.criarCompraRequest({ itens: [] });

      expect(() => reqEmCompraInput(body)).toThrow(BusinessError);
      expect(() => reqEmCompraInput(body))
        .toThrow("A lista de itens deve conter ao menos um item.");
    });

    it("deve lançar erro se produtoVariacaoId do item for inválido", () => {
      const body: any = CompraRequestMock.criarCompraRequest({
        itens: [
          CompraRequestMock.criarCompraItemRequest({ produtoVariacaoId: 0 })
        ]
      });

      expect(() => reqEmCompraInput(body)).toThrow(BusinessError);
      expect(() => reqEmCompraInput(body))
        .toThrow("Compra - Item #1: id da variação de produto inválido.");
    });

    it("deve lançar erro se quantidade do item for inválido", () => {
      const body: any = CompraRequestMock.criarCompraRequest({
        itens: [
          CompraRequestMock.criarCompraItemRequest({ quantidade: 0 })
        ]
      });

      expect(() => reqEmCompraInput(body)).toThrow(BusinessError);
      expect(() => reqEmCompraInput(body))
        .toThrow("Compra - Item #1: quantidade inválida.");
    });

    it("deve lançar erro se precoUnitario do item for inválido", () => {
      const body: any = CompraRequestMock.criarCompraRequest({
        itens: [
          CompraRequestMock.criarCompraItemRequest({ precoUnitario: 0 })
        ]
      });

      expect(() => reqEmCompraInput(body)).toThrow(BusinessError);
      expect(() => reqEmCompraInput(body))
        .toThrow("Compra - Item #1: preço unitário inválido.");
    });

    it("deve lançar erro se valorPago for inválido", () => {
      const body: any = CompraRequestMock.criarCompraRequest({ valorPago: undefined });

      expect(() => reqEmCompraInput(body)).toThrow(BusinessError);
      expect(() => reqEmCompraInput(body))
        .toThrow("Compra: Valor pago inválido.");
    });

    it("deve lançar erro se quantidadeParcelas for inválido", () => {
      const body: any = CompraRequestMock.criarCompraRequest({ quantidadeParcelas: -18 });

      expect(() => reqEmCompraInput(body)).toThrow(BusinessError);
      expect(() => reqEmCompraInput(body))
        .toThrow("Compra: Quantidade de parcelas inválida.");
    });

    it("deve lançar erro se formaPagamento for inválido", () => {
      const body: any = CompraRequestMock.criarCompraRequest({ formaPagamento: undefined });

      expect(() => reqEmCompraInput(body)).toThrow(BusinessError);
      expect(() => reqEmCompraInput(body))
        .toThrow("Compra: Forma de pagamento inválida.");
    });
  });
});
