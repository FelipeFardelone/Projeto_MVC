import {
  listarUsuariosModel,
  criarUsuarioModel,
  atualizarUsuarioModel,
  deletarUsuarioModel,
} from "../models/usuarioModel.js";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await listarUsuariosModel();
    res.json(usuarios);
  } catch (e) {
    res.status(500).json({ erro: "Falha ao listar usuários" });
  }
};

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const novoUsuario = await criarUsuarioModel(nome, email);
    res.status(201).json(novoUsuario);
  } catch (e) {
    res.status(500).json({ erro: "Falha ao criar usuário" });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const atualizado = await atualizarUsuarioModel(id, nome, email);
    if (!atualizado) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json({ mensagem: "Atualizado com sucesso" });
  } catch (e) {
    res.status(500).json({ erro: "Falha ao atualizar usuário" });
  }
};

export const deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const deletado = await deletarUsuarioModel(id);
    if (!deletado) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json({ mensagem: "Deletado com sucesso" });
  } catch (e) {
    res.status(500).json({ erro: "Falha ao deletar usuário" });
  }
};