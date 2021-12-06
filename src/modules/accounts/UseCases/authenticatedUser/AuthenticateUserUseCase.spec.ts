import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticatedUseCase } from "./authenticatedUseCase";

let authenticateUserUseCase: AuthenticatedUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticatedUseCase(userRepositoryInMemory);
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

  it("should not be able to athenticate an nonexistent user",() => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@gmail.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to athenticate with incorrect password",() => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "9999",
        email: "user@test.com",
        password: "1234",
        name: "user test",
      };

      await authenticateUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "abcd",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
