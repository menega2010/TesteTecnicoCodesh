import { Router } from "express";
import UserController from "../controller/UserController";

const userRouter = Router();

userRouter.post("/user-data", UserController.post);

export default userRouter;
