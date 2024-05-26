import { compare, genSalt, hash } from "bcryptjs";

export class PasswordCrypto {
  // Método estático para criar um hash de senha
  public static async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = 10;
      const salt: string = await genSalt(saltRounds);
      const hashedPassword: string = await hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error(`Erro ao criar hash de senha: ${error.message}`);
    }
  }

  // Método estático para verificar se a senha é válida
  public static async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      const isValid: boolean = await compare(password, hashedPassword);
      return isValid;
    } catch (error) {
      throw new Error(`Erro ao verificar senha: ${error.message}`);
    }
  }
}
