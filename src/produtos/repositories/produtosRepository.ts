import pool from "../../db";
import { produtoDBEmProduto } from "../mappers/produtoDBEmProduto";
import { produtoVariacaoDBEmProdutoVariacao } from "../mappers/produtoVariacaoDBEmProdutoVariacao";
import { Produto } from "../models/Produto";
import { ProdutoInput } from "../models/ProdutoInput";
import { ProdutoVariacao } from "../models/ProdutoVariacao";

export async function produtoExiste(produtoId: number, client?: any): Promise<boolean> {
  const executor = client || pool;

  const query = `SELECT 1 FROM produtos WHERE id = $1`;

  const res = await executor.query(query, [produtoId]);
  return (res.rowCount ?? 0) > 0;
}

export async function variacoesExistem(ids: number[], client?: any): Promise<boolean> {
  if (!ids.length) return false;

  const executor = client || pool;

  const query = `SELECT COUNT(*)::int AS total FROM produtos_variacoes WHERE id = ANY($1)`;

  const res = await executor.query(query, [ids]);
  return res.rows[0].total === ids.length;
}

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

export async function updateProdutoVariacaoEstoque(produtoVariacaoId: number, quantidade: number, client?: any): Promise<void> {
  const executor = client || pool;

  const query = `UPDATE produto_variacoes SET estoque = estoque + $1 WHERE id = $2`;
  const values = [quantidade, produtoVariacaoId];

  await executor.query(query, values);
  return;
}
