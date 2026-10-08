import { pool } from "../config/db.js";

export const listarUsuariosModel = async () => {
  const [rows] = await pool.query("SELECT * FROM usuarios");
  return rows;
};

export const criarUsuarioModel = async (nome, email) => {
  const [result] = await pool.query(
    "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
    [nome, email]
  );
  return { id: result.insertId, nome, email };
};

export const atualizarUsuarioModel = async (id, nome, email) => {
  const [result] = await pool.query(
    "UPDATE usuarios SET nome = COALESCE(?, nome), email = COALESCE(?, email) WHERE id = ?",
    [nome || null, email || null, id]
  );
  return result.affectedRows > 0;
};

export const deletarUsuarioModel = async (id) => {
  const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
  return result.affectedRows > 0;
};