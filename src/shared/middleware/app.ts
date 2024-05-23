import cors from "cors";
import express from "express";
import userRouter from "../../routes/user.routes";

export class App {
  private express: express.Application;
  private port = 5000;

  constructor() {
    this.express = express();
    this.listen();
    this.middlewares();
    this.routes();
  }

  public getApp(): express.Application {
    return this.express;
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }
  private listen(): void {
    this.express.listen(this.port, () => {
      console.log("Server rodando na porta", this.port);
    });
  }

  private routes(): void {
    this.express.use("/user", userRouter);
  }
}
