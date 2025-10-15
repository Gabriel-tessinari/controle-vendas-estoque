import * as mapper from '../../../src/mappers/kitMapper';
import { BusinessError } from '../../../src/shared/errors/BusinessError';

describe('kitMapper', () => {
  describe('mapRequestToKitInput', () => {
    it('deve mapear corretamente o request para KitInput', () => {
      const body = {
        nome: 'Kit Teste',
        precoVenda: 100,
        itens: [{ produtoId: 1, quantidade: 3 }],
      };

      const kitInput = mapper.mapRequestToKitInput(body);

      expect(kitInput.nome).toBe('Kit Teste');
      expect(kitInput.precoVenda).toBe(100);
      expect(kitInput.itens).toHaveLength(1);
    });

    it("deve lançar erro se nome estiver ausente", () => {
      const body = {
        precoVenda: 100,
        itens: [{ produtoId: 1, quantidade: 1 }]
      };

      expect(() => mapper.mapRequestToKitInput(body)).toThrow(BusinessError);
      expect(() => mapper.mapRequestToKitInput(body))
        .toThrow("O campo 'nome' é obrigatório e deve ser uma string.");
    });

    it('deve lançar erro se precoVenda for inválido', () => {
      const body = {
        nome: 'Kit Teste',
        precoVenda: 0,
        itens: [{ produtoId: 1, quantidade: 3 }],
      };

      expect(() => mapper.mapRequestToKitInput(body)).toThrow(BusinessError);
      expect(() => mapper.mapRequestToKitInput(body))
        .toThrow("O campo 'precoVenda' é obrigatório e deve ser um número maior que zero.");
    });

    it('deve lançar erro se não tiver itens', () => {
      const body = {
        nome: 'Kit Teste',
        precoVenda: 100,
        itens: [],
      };

      expect(() => mapper.mapRequestToKitInput(body)).toThrow(BusinessError);
      expect(() => mapper.mapRequestToKitInput(body))
        .toThrow("O kit deve ter pelo menos um item.");
    });

    it("deve lançar erro se produtoId for inválido", () => {
      const body = {
        nome: "Kit Teste",
        precoVenda: 100,
        itens: [{ produtoId: 0, quantidade: 1 }]
      };

      expect(() => mapper.mapRequestToKitInput(body)).toThrow(BusinessError);
      expect(() => mapper.mapRequestToKitInput(body))
        .toThrow("O item 1 precisa ter 'produtoId' válido.");
    });

    it("deve lançar erro se quantidade for inválida", () => {
      const body = {
        nome: "Kit Teste",
        precoVenda: 100,
        itens: [{ produtoId: 1, quantidade: 0 }]
      };

      expect(() => mapper.mapRequestToKitInput(body)).toThrow(BusinessError);
      expect(() => mapper.mapRequestToKitInput(body))
        .toThrow("O item 1 precisa ter 'quantidade' maior que zero.");
    });
  });
});
