import { UserRepositoryInterface } from "../interface/InterfaceRepository/UserRepositoryInterface";
import { UserDTO } from "../model/DTO/UserDTO";
import { FavoriteRepository } from "../repository/FavoriteRepository";
import { HistoryRepository } from "../repository/HistoryRepository";
import { PasswordCrypto } from "../shared/services";

export class UserService {
  private readonly historyRepository: HistoryRepository;
  private readonly favoriteRepository: FavoriteRepository;

  constructor(private readonly userRepository: UserRepositoryInterface) {
    this.historyRepository = new HistoryRepository();
    this.favoriteRepository = new FavoriteRepository();
  }

  public async getUserFavorites(userId: string, page: number, limit: number) {
    const { results, totalDocs, totalPages, hasNext, hasPrev } =
      await this.favoriteRepository.findFavoritesByUserId(userId, page, limit);
    return { results, totalDocs, page, totalPages, hasNext, hasPrev };
  }

  public async getUserHistory(userId: string, page: number, limit: number) {
    const { results, totalDocs, totalPages, hasNext, hasPrev } =
      await this.historyRepository.findHistoryByUserId(userId, page, limit);
    return { results, totalDocs, page, totalPages, hasNext, hasPrev };
  }

  public async postCreateUser({
    name,
    lastName,
    password,
    phone,
  }: UserDTO): Promise<void> {
    try {
      await this.userRepository.postCreateUser({
        name,
        lastName,
        password,
        phone,
      });
    } catch (error) {
      throw new Error("Erro ao criar usuário: " + error.message);
    }
  }

  public async authUser(username: string, password: string): Promise<Object> {
    try {
      const validateRet = { status: false, idUser: "" };
      const userDataValidate: UserDTO = await this.userRepository.authUser(
        username
      );

      if (!userDataValidate) {
        return false; // Usuário não encontrado
      }

      // Verificar a senha utilizando o serviço compartilhado PasswordCrypto
      const isPasswordValid = await PasswordCrypto.verifyPassword(
        password.toString(),
        userDataValidate.password.toString()
      );

      validateRet.idUser = userDataValidate.id;
      validateRet.status = isPasswordValid;

      return validateRet;
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
      throw new Error("Erro ao autenticar usuário: " + error.message);
    }
  }

  public async getUserProfile(userId: string): Promise<UserDTO> {
    return await this.userRepository.findById(userId);
  }
}
