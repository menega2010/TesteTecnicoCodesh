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
    console.log(name, lastName, password, phone);
    const passwordHash: string = await PasswordCrypto.hashPassword(password);
    await prismaClient.tab_user
      .create({
        data: {
          id: uuidv4(),
          name: name,
          lastName: lastName,
          password: passwordHash,
          phone: phone,
          createdAt: new Date(Date.now()).toISOString(),
        },
      })
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw new Error(`Error add time: ${error}`);
      });
  }
}
