import { ICreateUserDTO } from "@modules/dtos/ICreateUserDTO";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import {hash} from 'bcrypt'
import { AppError } from "@errors/AppError";
@injectable()
class CreateUserUseCase {
  constructor(@inject("UserRepository") private userRepository: IUserRepository) {}
  async create({
    name,

    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const emailAlreadyExists = await this.userRepository.findByEmail(email)
    if(emailAlreadyExists) {
      throw new AppError("User already exists")
    }
    const passwordHash = await hash(password,8)
    await this.userRepository.create({
      name,
      email,
      password:passwordHash,
      driver_license,
    });
  }
}
export { CreateUserUseCase };
