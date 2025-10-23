import { cadastrarMovimentacaoCompra } from "../../../../src/movimentacoes/usecases/cadastrarMovimentacaoCompra";
import { insertMovimentacao } from "../../../../src/movimentacoes/repositories/movimentacaoRepository";
import { alterarProdutoVariacaoDuranteCompra } from "../../../../src/produtos/usecases/alterarProdutoVariacaoDuranteCompra";
import { MovimentacaoInputMock } from "../../../mocks/movimentacoes/MovimentacaoInputMock";

jest.mock("../../../../src/movimentacoes/repositories/movimentacaoRepository");
jest.mock("../../../../src/produtos/usecases/alterarProdutoVariacaoDuranteCompra");

describe("cadastrarMovimentacaoCompra", () => {
  it("deve cadastrar movimentação de compra", async () => {
    const client = { query: jest.fn() };
    const precoUnitario = 18.02;
    const movimentacao = MovimentacaoInputMock.criar();

    (insertMovimentacao as jest.Mock).mockResolvedValue(undefined);
    (alterarProdutoVariacaoDuranteCompra as jest.Mock).mockResolvedValue(undefined);

    await cadastrarMovimentacaoCompra(movimentacao, precoUnitario, client);

    expect(insertMovimentacao).toHaveBeenCalledWith(movimentacao, client);
    expect(alterarProdutoVariacaoDuranteCompra).toHaveBeenCalledWith(
      movimentacao.produtoVariacaoId,
      precoUnitario,
      movimentacao.quantidade,
      client
    );
  });
});
