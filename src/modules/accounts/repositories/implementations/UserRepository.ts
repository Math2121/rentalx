import { getRepository, Repository } from "typeorm";
import { User } from "../../../../modules/accounts/entities/User";
import { ICreateUserDTO } from "../../../../modules/dtos/ICreateUserDTO";
import { IUserRepository } from "../IUsersRepository";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  async create({
    name,
    username,
    password,
    driver_license,
    email,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      password,
      driver_license,
      email,
    });

    await this.repository.save(user)
  }
}

export { UserRepository };
