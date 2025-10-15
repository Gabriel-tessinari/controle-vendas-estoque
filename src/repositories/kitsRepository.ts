import pool from "../db";
import { KitInput } from "../models/Kit";

export async function insertKitComItens(kit: KitInput): Promise<number> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const kitResult = await client.query(
      `INSERT INTO kits (nome, descricao, preco_compra, preco_venda, ativo)
       VALUES ($1, $2, 0, $3, true)
       RETURNING id`,
      [kit.nome, kit.descricao, kit.precoVenda]
    );

    const kitId = kitResult.rows[0].id;

    for (const item of kit.itens) {
      await client.query(
        `INSERT INTO kits_itens (kit_id, produto_id, quantidade)
         VALUES ($1, $2, $3)`,
        [kitId, item.produtoId, item.quantidade]
      );
    }

    await client.query("COMMIT");
    return kitId;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
