import { CompraInputMock } from "../../../mocks/compras/CompraInputMock";
import { compraItemInputEmMovimentacao } from "../../../../src/movimentacoes/mappers/compraItemEmMovimentacao";

describe("compraItemInputEmMovimentacao", () => {
  it("deve mapear corretamente CompraItemInput em Movimentação", () => {
    const compraItemInput = CompraInputMock.criarCompraItemInput();
    const compraId = 18;
    const dataCompra = "2025-02-18";

    const result = compraItemInputEmMovimentacao(compraId, dataCompra, compraItemInput);

    expect(result).toEqual({
      produtoVariacaoId: compraItemInput.produtoVariacaoId,
      quantidade: compraItemInput.quantidade,
      referenciaId: compraId,
      data: dataCompra,
      tipo: "ENTRADA",
      origem: "COMPRA"
    });
  });
});
