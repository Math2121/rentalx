import { getRepository, Repository } from "typeorm";
import { User } from "../../../../modules/accounts/entities/User";
import { ICreateUserDTO } from "../../../../modules/dtos/ICreateUserDTO";
import { IUserRepository } from "../IUsersRepository";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  async findById(user_id: string): Promise<User> {
    const user = await this.repository.findOne(user_id);
    return user;
  }
  async create({
    name,
    password,
    driver_license,
    email,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      driver_license,
      email,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
}

export { UserRepository };
