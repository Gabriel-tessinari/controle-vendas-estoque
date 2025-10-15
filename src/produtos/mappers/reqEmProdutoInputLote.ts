import { validar } from "../../shared/utils/validar";
import { ProdutoInput } from "../models/ProdutoInput";
import { ProdutoVariacaoInput } from "../models/ProdutoVariacaoInput";

export function reqEmProdutoInputLote(body: any[]): ProdutoInput[] {
  validar(
    !Array.isArray(body) || body.length === 0,
    'A lista de produtos deve conter ao menos um item.'
  );

  return body.map((produto: any, index: number): ProdutoInput => {
    validaProduto(produto, index);

    const variacoes: ProdutoVariacaoInput[] = produto.variacoes.map((variacao: any, indexV: number): ProdutoVariacaoInput => {
      validaProdutoVariacao(variacao, indexV, produto.precoVenda, index);
      return {
        descricao: variacao.descricao,
        precoVenda: produto.precoVenda
      };
    });

    return {
      nome: produto.nome,
      categoriaId: produto.categoriaId,
      variacoes
    }
  });
}

function validaProduto(body: any, index: number) {
  validar(
    !body.nome || typeof body.nome !== "string",
    `Produto #${index + 1}: nome inválido.`
  );

  validar(
    typeof body.categoriaId !== "number" || body.categoriaId <= 0,
    `Produto #${index + 1}: id da categoria inválido.`
  );

  validar(
    !Array.isArray(body.variacoes) || body.variacoes.length === 0,
    "A lista de variações deve conter ao menos um item."
  );
}

function validaProdutoVariacao(body: any, index: number, precoVende: number, indexProduto: number) {
  validar(
    !body.descricao || typeof body.descricao !== "string",
    `Produto #${indexProduto + 1} - Variação #${index + 1}: descrição inválida.`
  );

  validar(
    typeof precoVende !== "number" || precoVende <= 0,
    `Produto #${indexProduto + 1} - Variação #${index + 1}: preço de venda inválido.`
  );
}
