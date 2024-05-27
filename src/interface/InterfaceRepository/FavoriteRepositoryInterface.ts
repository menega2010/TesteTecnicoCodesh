import { FavoriteDTO } from "../../model/DTO/FavoriteDTO";

export interface FavoriteRepositoryInterface {
  addFavorite(favorite: FavoriteDTO): Promise<void>;
  removeFavorite(userId: string, pronom: string): Promise<void>;
}
