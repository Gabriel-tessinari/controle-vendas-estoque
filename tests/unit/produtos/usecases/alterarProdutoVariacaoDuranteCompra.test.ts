import { alterarProdutoVariacaoDuranteCompra } from "../../../../src/produtos/usecases/alterarProdutoVariacaoDuranteCompra";
import * as ProdutosRepo from "../../../../src/produtos/repositories/produtosVariacoesRepository";
import { ProdutoVariacaoCalculoPrecoCompraMock } from "../../../mocks/produtos/ProdutoVariacaoCalculoPrecoCompraMock";


jest.mock("../../../../src/produtos/repositories/produtosVariacoesRepository");

describe("alterarProdutoVariacaoDuranteCompra", () => {
  it("deve calcular corretamente o novo estoque e preço médio de compra e atualizar a variação de preoduto", async () => {
    const client = { query: jest.fn() };
    const produtoVariacaoId = 1;
    const precoCompra = 20;
    const quantidade = 5;
    const dbResponse = ProdutoVariacaoCalculoPrecoCompraMock.criar();
    const novoEstoque = dbResponse.estoque + quantidade;
    const novoPrecoCompra = (dbResponse.estoque * dbResponse.precoCompra + quantidade * precoCompra) / novoEstoque;

    (ProdutosRepo.selectEstoqueEPrecoCompraFromProdutosVariacoes as jest.Mock).mockResolvedValue(dbResponse);

    await alterarProdutoVariacaoDuranteCompra(produtoVariacaoId, precoCompra, quantidade, client);

    expect(ProdutosRepo.selectEstoqueEPrecoCompraFromProdutosVariacoes).toHaveBeenCalledWith(produtoVariacaoId, client);
    expect(ProdutosRepo.updateProdutoVariacaoSetEstoqueEPrecoCompra).toHaveBeenCalledWith(
      produtoVariacaoId,
      novoEstoque,
      novoPrecoCompra,
      client
    );
  });
});
