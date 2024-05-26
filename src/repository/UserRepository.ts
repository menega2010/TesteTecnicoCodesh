import { v4 as uuidv4 } from "uuid";
import { UserRepositoryInterface } from "../interface/InterfaceRepository/UserRepositoryInterface";
import { UserDTO } from "../model/DTO/UserDTO";
import prismaClient from "../prisma/prismaClient";
import { PasswordCrypto } from "../shared/services/PasswordCrypto";

export class UserRepository implements UserRepositoryInterface {
  constructor() {}

  public async postCreateUser({
    name,
    lastName,
    password,
    phone,
  }: UserDTO): Promise<void> {
    try {
      const passwordHash: string = await PasswordCrypto.hashPassword(password);

      await prismaClient.tab_user.create({
        data: {
          id: uuidv4(),
          name,
          lastName,
          password: passwordHash,
          phone,
          createdAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  public async authUser(username: string): Promise<UserDTO | null> {
    try {
      const user = await prismaClient.tab_user.findFirst({
        where: {
          AND: [{ name: username }],
        },
      });

      if (!user) {
        return null; // Usuário não encontrado
      }

      const { id, name, lastName, password, phone } = user;

      const userDTO: UserDTO = {
        id,
        name,
        lastName,
        password, // Evite armazenar a senha em plain text em DTOs, é apenas um exemplo.
        phone,
      };

      return userDTO;
    } catch (error) {
      throw new Error(`Erro ao autenticar usuário: ${error.message}`);
    }
  }
}
