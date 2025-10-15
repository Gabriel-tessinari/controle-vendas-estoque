import { Pool } from 'pg';
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Banco de Dados conectado com sucesso!");
    console.log("Hora atual no servidor BD:", result.rows[0].now);
  } catch (err) {
    console.error("Erro ao conectar no Banco de Dados:", err);
  }
}

testConnection();

export default pool;