import { UserRepositoryInterface } from "../interface/InterfaceRepository/UserRepositoryInterface";
import { UserServiceInterface } from "../interface/InterfaceService/UserServiceInterface";
import { UserDTO } from "../model/DTO/UserDTO";

export class UserService implements UserServiceInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}
  public async postCreateUser({
    name,
    lastName,
    password,
    phone,
  }: UserDTO): Promise<void> {
    this.userRepository.postCreateUser({ name, lastName, password, phone });
  }
}
