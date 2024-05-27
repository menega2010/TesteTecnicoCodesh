import { Router } from "express";
import UserController from "../controller/UserController";
import { EnsureAuthenticated } from "../shared/middleware";

const userRouter = Router();

// Rotas para histórico e favoritos do usuário, protegidas por autenticação
userRouter.get("/me/history", EnsureAuthenticated, UserController.getHistory);
userRouter.get(
  "/me/favorites",
  EnsureAuthenticated,
  UserController.getFavorites
);

// Rota para obter o perfil do usuário, protegida por autenticação
userRouter.get("/me", EnsureAuthenticated, UserController.getProfile);

// Rota para registrar um novo usuário
userRouter.post("/register", UserController.post);

// Rota para autenticar um usuário
userRouter.post("/authenticate", UserController.postAuth);

export default userRouter;
