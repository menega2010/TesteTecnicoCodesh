import { UserDTO } from "../../model/DTO/UserDTO";

export interface UserServiceInterface {
  postCreateUser({ name, lastName, password, phone }: UserDTO): Promise<void>;
}
