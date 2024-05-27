import { Request, Response } from "express";
import { HistoryRepository } from "../repository/HistoryRepository";
import { DictionaryService } from "../service/DictionaryService";
import { HistoryService } from "../service/HistoryService";

export class DictionaryController {
  private dictionaryService: DictionaryService;
  private historyService: HistoryService;

  constructor() {
    this.dictionaryService = new DictionaryService();
    this.historyService = new HistoryService(new HistoryRepository());
  }

  public async getDefinition(req: Request, res: Response): Promise<Response> {
    try {
      const search = req.query.search as string;
      const limit = parseInt(req.query.limit as string, 10) || 4;
      const page = parseInt(req.query.page as string, 10) || 1;

      if (!search) {
        return res
          .status(400)
          .json({ message: "O parâmetro de busca 'search' é obrigatório" });
      }

      const synonyms = await this.dictionaryService.fetchSynonyms(search);
      const totalDocs = synonyms.length;
      const totalPages = Math.ceil(totalDocs / limit);
      const hasNext = page < totalPages;
      const hasPrev = page > 1;
      const startIndex = (page - 1) * limit;
      const endIndex = Math.min(startIndex + limit, totalDocs);
      const paginatedSynonyms = synonyms.slice(startIndex, endIndex);

      const result = {
        results: paginatedSynonyms,
        totalDocs,
        page,
        totalPages,
        hasNext,
        hasPrev,
      };

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar definição", error: error.message });
    }
  }

  public async getWord(req: Request, res: Response): Promise<Response> {
    try {
      const { word } = req.params;
      const userId = req.headers["idUsuario"] as string; // Suposição: ID do usuário é enviado no cabeçalho
      console.log(req.headers);
      if (!word) {
        return res.status(400).json({ message: "A palavra é obrigatória" });
      }

      if (!userId) {
        return res.status(400).json({ message: "ID do usuário é obrigatório" });
      }

      const wordData = await this.dictionaryService.fetchWord(word);

      await this.historyService.addHistoryEntry({
        userId,
        pronom: word,
        createdAt: new Date().toISOString(),
      });

      return res.status(200).json(wordData);
    } catch (error) {
      console.error("Erro ao obter palavra:", error);
      return res
        .status(500)
        .json({ message: "Erro ao obter palavra", error: error.message });
    }
  }
}
