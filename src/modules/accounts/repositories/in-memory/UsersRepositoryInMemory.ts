import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUserRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUserRepository{
    users:User[] = [];
    async create({driver_license,email,name,password}: ICreateUserDTO): Promise<void> {
      const user = new User();

      Object.assign(user, {driver_license,email,name,password})

      this.users.push(user)
    }
    async findByEmail(email: string): Promise<User> {
     return this.users.find((user)=>user.email === email);
    }
    async findById(user_id: string): Promise<User> {
        return this.users.find((user)=>user.id === user_id);
    }

}

export {UsersRepositoryInMemory}