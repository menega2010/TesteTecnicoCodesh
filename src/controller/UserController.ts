import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserDTO } from "../model/DTO/UserDTO";
import { UserRepository } from "../repository/UserRepository";
import { UserService } from "../service/UserService";
import { JWTService } from "../shared/services";

export default {
  async getProfile(req: Request, resp: Response): Promise<Response> {
    try {
      const userId = req.headers["idUsuario"] as string;

      if (!userId) {
        return resp
          .status(400)
          .json({ message: "ID do usuário é obrigatório" });
      }
      const userService = new UserService(new UserRepository());

      const userProfile = await userService.getUserProfile(userId);

      return resp.status(200).json(userProfile);
    } catch (error) {
      console.error("Erro ao obter perfil do usuário:", error);
      return resp.status(500).json({
        message: "Erro ao obter perfil do usuário",
        error: error.message,
      });
    }
  },

  async getHistory(req: Request, resp: Response): Promise<Response> {
    try {
      const userId = req.headers["idUsuario"] as string;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      if (!userId) {
        return resp
          .status(400)
          .json({ message: "ID do usuário é obrigatório" });
      }
      const userService = new UserService(new UserRepository());
      const history = await userService.getUserHistory(userId, page, limit);

      return resp.status(200).json(history);
    } catch (error) {
      console.error("Erro ao obter histórico do usuário:", error);
      return resp.status(500).json({
        message: "Erro ao obter histórico do usuário",
        error: error.message,
      });
    }
  },

  async getFavorites(req: Request, resp: Response): Promise<Response> {
    try {
      const userId = req.headers["idUsuario"] as string;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      if (!userId) {
        return resp
          .status(400)
          .json({ message: "ID do usuário é obrigatório" });
      }
      const userService = new UserService(new UserRepository());

      const favorites = await userService.getUserFavorites(userId, page, limit);

      return resp.status(200).json(favorites);
    } catch (error) {
      console.error("Erro ao obter favoritos do usuário:", error);
      return resp.status(500).json({
        message: "Erro ao obter favoritos do usuário",
        error: error.message,
      });
    }
  },

  async post(req: Request, resp: Response): Promise<Response> {
    try {
      const { name, lastName, password, phone } = req.body as UserDTO;

      // Validação básica dos campos necessários
      if (!name || !lastName || !password || !phone) {
        return resp
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      const userService = new UserService(new UserRepository());
      await userService.postCreateUser({ name, lastName, password, phone });

      // Retornar status 201 para criação bem-sucedida
      return resp.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      // Tratar erros e retornar status 500 para erros internos do servidor
      console.error("Erro ao criar usuário:", error);
      return resp
        .status(500)
        .json({ message: "Erro ao criar usuário", error: error.message });
    }
  },

  async postAuth(req: Request, resp: Response): Promise<Response> {
    try {
      const { name, password } = req.body;
      // Validação dos campos de entrada
      if (!name || !password) {
        return resp
          .status(400)
          .json({ message: "Usuário e senha são obrigatórios" });
      }

      const userService = new UserService(new UserRepository());
      const isAuthenticated = await userService.authUser(name, password);

      if (isAuthenticated["status"]) {
        // Retornar status 200 para autenticação bem-sucedida
        const acessToken = JWTService.sign({
          uid: isAuthenticated["idUser"],
        });
        if (acessToken === "JWT_SECRET_NOT_FOUND") {
          return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
              default: "Error ao gerar token de acesso",
            },
          });
        }
        return resp.status(200).json({
          message: "Autenticação bem-sucedida",
          acessToken: acessToken,
        });
      } else {
        // Retornar status 401 para credenciais inválidas
        return resp.status(401).json({ message: "Credenciais inválidas" });
      }
    } catch (error) {
      // Tratar erros e retornar status 500 para erros internos do servidor
      console.error("Erro ao autenticar usuário:", error);
      return resp
        .status(500)
        .json({ message: "Erro ao autenticar usuário", error: error.message });
    }
  },
};
