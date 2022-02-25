import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticatedUseCase } from "./authenticatedUseCase";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

let authenticateUserUseCase: AuthenticatedUseCase;
let usersTokensRespository: UsersTokensRepository;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRespository = new UsersTokensRepository()
    authenticateUserUseCase = new AuthenticatedUseCase(userRepositoryInMemory,usersTokensRespository);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able create an toker", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000554",
      email: "math@21gmail.com",
      password: "1234",
      name: "User Test",
    };

    await createUserUseCase.create(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("should not be able to athenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@gmail.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("E-mail or password incorrect"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "9999",
      email: "user@test.com",
      password: "1234",
      name: "user test",
    };

    await userRepositoryInMemory.create(user);
  
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect",
      })
    ).rejects.toEqual(new AppError("E-mail or password incorrect"));
  });
});
