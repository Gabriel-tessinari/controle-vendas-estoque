import { ProdutoRequestMock } from "../../../mocks/produtos/ProdutoRequestMock";
import { reqEmProdutoInputLote } from "../../../../src/produtos/mappers/reqEmProdutoInputLote";
import { BusinessError } from "../../../../src/shared/errors/BusinessError";
import { Aleatorios } from "../../../../src/shared/utils/aleatorio";
import { ProdutoInput } from "../../../../src/produtos/models/ProdutoInput";

describe("reqEmProdutoInputLote", () => {
  it("deve mapear produtos corretamente", () => {
    const request = ProdutoRequestMock.criarListaDeProdutosRequest(2);
    const result: ProdutoInput[] = reqEmProdutoInputLote(request);

    expect(result).toHaveLength(2);
    expect(result[0]).toStrictEqual({
      nome: request[0].nome,
      categoriaId: request[0].categoriaId,
      variacoes: [
        { descricao: request[0].variacoes[0].descricao, precoVenda: request[0].precoVenda },
        { descricao: request[0].variacoes[1].descricao, precoVenda: request[0].precoVenda },
        { descricao: request[0].variacoes[2].descricao, precoVenda: request[0].precoVenda }
      ]
    });
  });

  it("deve lançar erro se lista de produtos vazia", () => {
    const request: any[] = [];

    expect(() => reqEmProdutoInputLote(request)).toThrow(BusinessError);
    expect(() => reqEmProdutoInputLote(request)).toThrow(
      "A lista de produtos deve conter ao menos um item."
    );
  });

  it("deve lançar erro se produto.nome é null", () => {
    const request = [
      ProdutoRequestMock.criarProdutoRequest({
        nome: null
      })
    ];

    expect(() => reqEmProdutoInputLote(request)).toThrow(BusinessError);
    expect(() => reqEmProdutoInputLote(request)).toThrow(
      "Produto #1: nome inválido."
    );
  });

  it("deve lançar erro se produto.nome não é string", () => {
    const request = [
      ProdutoRequestMock.criarProdutoRequest({
        nome: 1
      })
    ];

    expect(() => reqEmProdutoInputLote(request)).toThrow(BusinessError);
    expect(() => reqEmProdutoInputLote(request)).toThrow(
      "Produto #1: nome inválido."
    );
  });

  it("deve lançar erro se produto.categoriaId é null", () => {
    const request = [
      ProdutoRequestMock.criarProdutoRequest({
        categoriaId: null
      })
    ];

    expect(() => reqEmProdutoInputLote(request)).toThrow(BusinessError);
    expect(() => reqEmProdutoInputLote(request)).toThrow(
      "Produto #1: id da categoria inválido."
    );
  });

  it("deve lançar erro se produto.categoriaId é 0", () => {
    const request = [
      ProdutoRequestMock.criarProdutoRequest({
        categoriaId: Aleatorios.getInt() * -1
      })
    ];

    expect(() => reqEmProdutoInputLote(request)).toThrow(BusinessError);
    expect(() => reqEmProdutoInputLote(request)).toThrow(
      "Produto #1: id da categoria inválido."
    );
  });

  it("deve lançar erro se produto.categoriaId é negativo", () => {
    const request = [
      ProdutoRequestMock.criarProdutoRequest({
        categoriaId: Aleatorios.getInt() * -1
      })
    ];

    expect(() => reqEmProdutoInputLote(request)).toThrow(BusinessError);
    expect(() => reqEmProdutoInputLote(request)).toThrow(
      "Produto #1: id da categoria inválido."
    );
  });

  it("deve lançar erro se produto.variacoes vazia", () => {
    const request = [
      ProdutoRequestMock.criarProdutoRequest({
        variacoes: []
      })
    ];

    expect(() => reqEmProdutoInputLote(request)).toThrow(BusinessError);
    expect(() => reqEmProdutoInputLote(request)).toThrow(
      "A lista de variações deve conter ao menos um item."
    );
  });

  it("deve lançar erro se variacao.descricao é null", () => {
    const request = [
      ProdutoRequestMock.criarProdutoRequest({
        variacoes: [
          ProdutoRequestMock.criarProdutoVariacaoRequest({
            descricao: null
          })
        ]
      })
    ];

    expect(() => reqEmProdutoInputLote(request)).toThrow(BusinessError);
    expect(() => reqEmProdutoInputLote(request)).toThrow(
      "Produto #1 - Variação #1: descrição inválida."
    );
  });

  it("deve lançar erro se variacao.descricao não é string", () => {
    const request = [
      ProdutoRequestMock.criarProdutoRequest({
        variacoes: [
          ProdutoRequestMock.criarProdutoVariacaoRequest({
            descricao: 1
          })
        ]
      })
    ];

    expect(() => reqEmProdutoInputLote(request)).toThrow(BusinessError);
    expect(() => reqEmProdutoInputLote(request)).toThrow(
      "Produto #1 - Variação #1: descrição inválida."
    );
  });

  it("deve lançar erro se variacao.precoVenda é null", () => {
    const request = [
      ProdutoRequestMock.criarProdutoRequest({
        precoVenda: null
      })
    ];

    expect(() => reqEmProdutoInputLote(request)).toThrow(BusinessError);
    expect(() => reqEmProdutoInputLote(request)).toThrow(
      "Produto #1 - Variação #1: preço de venda inválido."
    );
  });

  it("deve lançar erro se variacao.precoVenda é 0", () => {
    const request = [
      ProdutoRequestMock.criarProdutoRequest({
        precoVenda: 0
      })
    ];

    expect(() => reqEmProdutoInputLote(request)).toThrow(BusinessError);
    expect(() => reqEmProdutoInputLote(request)).toThrow(
      "Produto #1 - Variação #1: preço de venda inválido."
    );
  });

  it("deve lançar erro se variacao.precoVenda negativo", () => {
    const request = [
      ProdutoRequestMock.criarProdutoRequest({
        precoVenda: Aleatorios.getFloat() * -1
      })
    ];

    expect(() => reqEmProdutoInputLote(request)).toThrow(BusinessError);
    expect(() => reqEmProdutoInputLote(request)).toThrow(
      "Produto #1 - Variação #1: preço de venda inválido."
    );
  });
});
