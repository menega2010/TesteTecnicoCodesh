import { FavoriteRepositoryInterface } from "../interface/InterfaceRepository/FavoriteRepositoryInterface";
import { FavoriteDTO } from "../model/DTO/FavoriteDTO";

export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepositoryInterface
  ) {}

  public async addFavorite(favorite: FavoriteDTO): Promise<void> {
    await this.favoriteRepository.addFavorite(favorite);
  }

  public async removeFavorite(userId: string, pronom: string): Promise<void> {
    await this.favoriteRepository.removeFavorite(userId, pronom);
  }
}
