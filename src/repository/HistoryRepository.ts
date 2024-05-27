import { v4 as uuidv4 } from "uuid";
import { HistoryRepositoryInterface } from "../interface/InterfaceRepository/HistoryREpositoryInterface";
import { HistoryDTO } from "../model/DTO/HistoryDTO";
import prismaClient from "../prisma/prismaClient";

export class HistoryRepository implements HistoryRepositoryInterface {
  public async findHistoryByUserId(
    userId: string,
    page: number,
    limit: number
  ) {
    const offset = (page - 1) * limit;

    const [totalDocs, history] = await Promise.all([
      prismaClient.tab_history.count({
        where: { userId },
      }),
      prismaClient.tab_history.findMany({
        where: { userId },
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const totalPages = Math.ceil(totalDocs / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    const results = history.map((entry) => ({
      word: entry.pronom,
      added: entry.createdAt,
    }));

    return { results, totalDocs, totalPages, hasNext, hasPrev };
  }
  public async addHistoryEntry(history: HistoryDTO): Promise<void> {
    try {
      await prismaClient.tab_history.create({
        data: {
          id: uuidv4(),
          userId: history.userId,
          pronom: history.pronom,
          createdAt: new Date().toISOString(),
          updatedAt: history.updatedAt || null,
        },
      });
    } catch (error) {
      throw new Error(
        `Erro ao adicionar entrada no histórico: ${error.message}`
      );
    }
  }
}
