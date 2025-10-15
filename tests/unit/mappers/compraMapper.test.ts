import * as mapper from '../../../src/mappers/compraMapper';
import { BusinessError } from '../../../src/shared/errors/BusinessError';

describe('compraMapper', () => {
  let body: any;

  beforeEach(() => {
    body = {
      fornecedorId: 1,
      data: '2025-02-18',
      frete: 0,
      outrasTaxas: 0,
      itens: [
        {
          produtoVariacaoId: 18,
          quantidade: 2,
          precoUnitario: 10
        }
      ],
      formaPagamento: 'PIX',
      valorPago: 0,
      quantidadeParcelas: 1
    }
  });

  describe('mapRequestToCompraInput', () => {
    it('deve mapear corretamente o request para CompraInput', () => {
      const compraInput = mapper.mapRequestToCompraInput(body);

      expect(compraInput.fornecedorId).toBe(body.fornecedorId);
      expect(compraInput.dataCompra).toBe(body.data);
      expect(compraInput.frete).toBe(body.frete);
      expect(compraInput.outrasTaxas).toBe(body.outrasTaxas);
      expect(compraInput.pagamentos).toHaveLength(0);
      expect(compraInput.itens).toStrictEqual(body.itens);
    });

    it("deve lançar erro se fornecedorId for inválido", () => {
      const req = {
        ...body,
        fornecedorId: 0
      };

      expect(() => mapper.mapRequestToCompraInput(req)).toThrow(BusinessError);
      expect(() => mapper.mapRequestToCompraInput(req))
        .toThrow("O campo 'fornecedorId' é obrigatório e deve ser um número válido.");
    });

    it("deve lançar erro se data for inválida", () => {
      const req = {
        ...body,
        data: undefined
      };

      expect(() => mapper.mapRequestToCompraInput(req)).toThrow(BusinessError);
      expect(() => mapper.mapRequestToCompraInput(req))
        .toThrow("O campo 'data' é obrigatório.");
    });

    it("deve lançar erro se lista de itens vazia", () => {
      const req = {
        ...body,
        itens: []
      };

      expect(() => mapper.mapRequestToCompraInput(req)).toThrow(BusinessError);
      expect(() => mapper.mapRequestToCompraInput(req))
        .toThrow("A compra deve ter pelo menos um item.");
    });

    it("deve lançar erro se produtoVariacaoId do item for inválido", () => {
      const req = {
        ...body,
        itens: [{
          produtoVariacaoId: 0,
          quantidade: 2,
          precoUnitario: 10
        }]
      };

      expect(() => mapper.mapRequestToCompraInput(req)).toThrow(BusinessError);
      expect(() => mapper.mapRequestToCompraInput(req))
        .toThrow("O item 1 precisa ter 'produtoVariacaoId' válido.");
    });

    it("deve lançar erro se quantidade do item for inválida", () => {
      const req = {
        ...body,
        itens: [{
          produtoVariacaoId: 1,
          quantidade: 0,
          precoUnitario: 10
        }]
      };

      expect(() => mapper.mapRequestToCompraInput(req)).toThrow(BusinessError);
      expect(() => mapper.mapRequestToCompraInput(req))
        .toThrow("O item 1 precisa ter 'quantidade' maior que zero.");
    });

    it("deve lançar erro se precoUnitario do item for inválido", () => {
      const req = {
        ...body,
        itens: [{
          produtoVariacaoId: 1,
          quantidade: 2,
          precoUnitario: 0
        }]
      };

      expect(() => mapper.mapRequestToCompraInput(req)).toThrow(BusinessError);
      expect(() => mapper.mapRequestToCompraInput(req))
        .toThrow("O item 1 precisa ter 'precoUnitario' maior que zero.");
    });
  });
});
