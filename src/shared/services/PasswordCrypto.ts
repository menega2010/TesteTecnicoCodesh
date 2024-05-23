import { compare, genSalt, hash } from "bcryptjs";
//Cria Hash Password
const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const salt: string = await genSalt(saltRounds);
  return hash(password, salt);
};
//Faz compare pra ver se é valida
const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
  hashPassword,
  verifyPassword,
};
