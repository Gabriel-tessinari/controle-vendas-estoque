import pool from "../../db";
import { produtoDBEmProduto } from "../mappers/produtoDBEmProduto";
import { produtosDBEmProdutosCatalogo } from "../mappers/produtosDBEmProdutosCatalogo";
import { produtoVariacaoDBEmProdutoVariacao } from "../mappers/produtoVariacaoDBEmProdutoVariacao";
import { Produto } from "../models/Produto";
import { ProdutoInput } from "../models/ProdutoInput";
import { ProdutoVariacao } from "../models/ProdutoVariacao";

export async function insertProdutosComVariacoesLote(produtos: ProdutoInput[]): Promise<Produto[]> {
  const client = await pool.connect();
  const produtosCriados: Produto[] = [];

  try {
    await client.query('BEGIN');

    for (const produto of produtos) {
      const result = await client.query(
        `INSERT INTO produtos (nome, categoria_id)
        VALUES ($1, $2)
        RETURNING *`,
        [produto.nome, produto.categoriaId]
      );

      const produtoCriado: Produto = produtoDBEmProduto(result.rows[0]);

      const values: any[] = [];
      const params: any[] = [];

      produto.variacoes.forEach((v, i) => {
        const offset: number = i * 2;
        params.push(`($1, $${offset + 2}, 0, $${offset + 3}, 0)`);
        values.push(v.descricao, v.precoVenda);
      });

      const query = `
        INSERT INTO produtos_variacoes (produto_id, descricao, preco_compra, preco_venda, estoque)
        VALUES ${params.join(', ')}
        RETURNING *
      `;

      const variacoesResult = await client.query(query, [produtoCriado.id, ...values]);
      const variacoesCriadas: ProdutoVariacao[] = variacoesResult.rows.map(produtoVariacaoDBEmProdutoVariacao);

      produtosCriados.push({
        ...produtoCriado,
        variacoes: variacoesCriadas
      });
    }

    await client.query("COMMIT");
    return produtosCriados;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function produtoExiste(produtoId: number, client?: any): Promise<boolean> {
  const executor = client || pool;

  const query = `SELECT 1 FROM produtos WHERE id = $1`;

  const res = await executor.query(query, [produtoId]);
  return (res.rowCount ?? 0) > 0;
}

export async function produtosExistem(ids: number[], client?: any): Promise<boolean> {
  if (!ids.length) return false;

  const executor = client || pool;

  const query = `
    SELECT COUNT(*)::int AS total
    FROM produtos
    WHERE id = ANY($1)
  `;

  const res = await executor.query(query, [ids]);
  return res.rows[0].total === ids.length;
}

export async function selectProdutosComVariacoes(pesquisar: string, client?: any): Promise<Produto[]> {
  const executor = client || pool;
  const params: any[] = [];
  let whereClause = '';

  if (pesquisar && pesquisar.trim() !== '') {
    params.push(`%${pesquisar}%`);
    whereClause = `
      WHERE p.nome ILIKE $1
      OR v.descricao ILIKE $1
    `;
  }

  const query = `
    SELECT 
      p.id AS produto_id,
      p.nome AS produto_nome,
      p.categoria_id AS produto_categoria_id,
      v.id AS variacao_id,
      v.produto_id AS variacao_produto_id,
      v.descricao AS variacao_descricao,
      v.preco_compra AS variacao_preco_compra,
      v.preco_venda AS variacao_preco_venda,
      v.estoque AS variacao_estoque
    FROM produtos p
    LEFT JOIN produtos_variacoes v ON v.produto_id = p.id
    ${whereClause}
    ORDER BY p.nome ASC, v.id ASC;
  `;

  const produtosDB = await executor.query(query, params);

  return produtosDBEmProdutosCatalogo(produtosDB.rows);
}
