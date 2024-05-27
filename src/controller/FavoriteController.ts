import { Request, Response } from "express";
import { FavoriteDTO } from "../model/DTO/FavoriteDTO";
import { FavoriteRepository } from "../repository/FavoriteRepository";
import { HistoryRepository } from "../repository/HistoryRepository";
import { UserRepository } from "../repository/UserRepository";
import { FavoriteService } from "../service/FavoriteService";
import { HistoryService } from "../service/HistoryService";
import { UserService } from "../service/UserService";

export class FavoriteController {
  private userService: UserService;
  private historyService: HistoryService;
  private favoriteService: FavoriteService;

  constructor() {
    this.userService = new UserService(new UserRepository());
    this.historyService = new HistoryService(new HistoryRepository());
    this.favoriteService = new FavoriteService(new FavoriteRepository());
  }

  public async favoriteWord(req: Request, res: Response): Promise<Response> {
    try {
      const { word } = req.params;
      const userId = req.headers["idUsuario"] as string;
      console.log(req.headers);
      if (!word) {
        return res.status(400).json({ message: "A palavra é obrigatória" });
      }

      if (!userId) {
        return res.status(400).json({ message: "ID do usuário é obrigatório" });
      }

      const favoriteDTO: FavoriteDTO = {
        userId,
        pronom: word,
        createdAt: new Date().toISOString(),
      };

      await this.favoriteService.addFavorite(favoriteDTO);

      return res
        .status(201)
        .json({ message: "Palavra adicionada aos favoritos com sucesso" });
    } catch (error) {
      console.error("Erro ao adicionar palavra aos favoritos:", error);
      return res.status(500).json({
        message: "Erro ao adicionar palavra aos favoritos",
        error: error.message,
      });
    }
  }

  public async unfavoriteWord(req: Request, res: Response): Promise<Response> {
    try {
      const { word } = req.params;
      const userId = req.headers["idUsuario"] as string;

      if (!word) {
        return res.status(400).json({ message: "A palavra é obrigatória" });
      }

      if (!userId) {
        return res.status(400).json({ message: "ID do usuário é obrigatório" });
      }

      await this.favoriteService.removeFavorite(userId, word);

      return res
        .status(200)
        .json({ message: "Palavra removida dos favoritos com sucesso" });
    } catch (error) {
      console.error("Erro ao remover palavra dos favoritos:", error);
      return res.status(500).json({
        message: "Erro ao remover palavra dos favoritos",
        error: error.message,
      });
    }
  }
}
