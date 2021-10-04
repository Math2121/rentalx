import { ICreateUserDTO } from "@modules/dtos/ICreateUserDTO";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repositories/IUsersRepository";
@injectable()
class CreateUserUseCase {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) {}
  async create({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    await this.userRepository.create({
      name,
      username,
      email,
      password,
      driver_license,
    });
  }
}
export { CreateUserUseCase };
