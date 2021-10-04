import { ICreateUserDTO } from "@modules/dtos/ICreateUserDTO";

interface IUserRepository {
  create(data:ICreateUserDTO):Promise<void>;
}
export { IUserRepository };
