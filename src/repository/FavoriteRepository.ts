import { v4 as uuidv4 } from "uuid";
import { FavoriteRepositoryInterface } from "../interface/InterfaceRepository/FavoriteRepositoryInterface";
import { FavoriteDTO } from "../model/DTO/FavoriteDTO";
import prismaClient from "../prisma/prismaClient";

export class FavoriteRepository implements FavoriteRepositoryInterface {
  public async addFavorite(favorite: FavoriteDTO): Promise<void> {
    try {
      await prismaClient.tab_favorite.create({
        data: {
          id: uuidv4(),
          userId: favorite.userId,
          pronom: favorite.pronom,
          createdAt: new Date().toISOString(),
          updatedAt: favorite.updatedAt || null,
        },
      });
    } catch (error) {
      throw new Error(
        `Erro ao adicionar palavra aos favoritos: ${error.message}`
      );
    }
  }
  public async removeFavorite(userId: string, pronom: string): Promise<void> {
    await prismaClient.tab_favorite.deleteMany({
      where: {
        userId,
        pronom,
      },
    });
  }

  public async findFavoritesByUserId(
    userId: string,
    page: number,
    limit: number
  ) {
    const offset = (page - 1) * limit;

    const [totalDocs, favorites] = await Promise.all([
      prismaClient.tab_favorite.count({
        where: { userId },
      }),
      prismaClient.tab_favorite.findMany({
        where: { userId },
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const totalPages = Math.ceil(totalDocs / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    const results = favorites.map((entry) => ({
      word: entry.pronom,
      added: entry.createdAt,
    }));

    return { results, totalDocs, totalPages, hasNext, hasPrev };
  }
}
