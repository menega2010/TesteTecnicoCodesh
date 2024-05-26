import { UserDTO } from "../../model/DTO/UserDTO";

export interface UserRepositoryInterface {
  postCreateUser({ name, lastName, password, phone }: UserDTO): Promise<void>;
  authUser(username: string): Promise<UserDTO>;
}
