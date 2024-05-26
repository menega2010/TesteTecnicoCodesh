import cors from "cors";
import express, { Application } from "express";
import userRouter from "../../routes/user.routes";

export class App {
  private express: Application;
  private port = 5000;

  constructor() {
    this.express = express();
    this.listen();
    this.configureMiddlewares();
    this.configureRoutes();
  }

  public getApp(): Application {
    return this.express;
  }

  private listen(): void {
    this.express.listen(this.port, () => {
      console.log("Server rodando na porta", this.port);
    });
  }

  private configureMiddlewares(): void {
    this.express.use(express.json()); // Middleware para processar corpos de requisição JSON
    this.configureCors(); // Configuração do CORS
  }

  private configureCors(): void {
    // Configurações do CORS
    const corsOptions: cors.CorsOptions = {
      origin: "*", // Permitir solicitações de qualquer origem
      methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
      allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
    };

    this.express.use(cors(corsOptions));
  }

  private configureRoutes(): void {
    // Configuração das rotas
    this.express.use("/user", userRouter);
  }
}
