import { ICreateUserDTO } from "../../../modules/dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(user_id:string):Promise<User>;
}
export { IUserRepository };
