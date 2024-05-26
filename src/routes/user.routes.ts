import { Router } from "express";
import UserController from "../controller/UserController";

const userRouter = Router();
//Exemplo de rota com validate jwt
// userRouter.post("/user-data", EnsureAuthenticated, UserController.post);
userRouter.post("/user-register", UserController.post);
userRouter.post("/user-validate", UserController.postAuth);
export default userRouter;
