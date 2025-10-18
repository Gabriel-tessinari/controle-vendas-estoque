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

    // it("deve lançar erro se produtoVariacaoId do item for inválido", () => {
    //   const req = {
    //     ...body,
    //     itens: [{
    //       produtoVariacaoId: 0,
    //       quantidade: 2,
    //       precoUnitario: 10
    //     }]
    //   };

    //   expect(() => mapper.mapRequestToCompraInput(req)).toThrow(BusinessError);
    //   expect(() => mapper.mapRequestToCompraInput(req))
    //     .toThrow("O item 1 precisa ter 'produtoVariacaoId' válido.");
    // });

    // it("deve lançar erro se quantidade do item for inválida", () => {
    //   const req = {
    //     ...body,
    //     itens: [{
    //       produtoVariacaoId: 1,
    //       quantidade: 0,
    //       precoUnitario: 10
    //     }]
    //   };

    //   expect(() => mapper.mapRequestToCompraInput(req)).toThrow(BusinessError);
    //   expect(() => mapper.mapRequestToCompraInput(req))
    //     .toThrow("O item 1 precisa ter 'quantidade' maior que zero.");
    // });

    // it("deve lançar erro se precoUnitario do item for inválido", () => {
    //   const req = {
    //     ...body,
    //     itens: [{
    //       produtoVariacaoId: 1,
    //       quantidade: 2,
    //       precoUnitario: 0
    //     }]
    //   };

    //   expect(() => mapper.mapRequestToCompraInput(req)).toThrow(BusinessError);
    //   expect(() => mapper.mapRequestToCompraInput(req))
    //     .toThrow("O item 1 precisa ter 'precoUnitario' maior que zero.");
    // });
  });
});
