import { IUserRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
@injectable()
class AuthenticatedUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    // verifica se o usuário  existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("E-mail or password incorrect");
    }

    // verifica se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("E-mail or password incorrect");
    }

    //Gerar JWT

    const token = sign({}, "dkçlwgvwrjfdeigqvr3554541454ferf", {
      subject: user.id,
      expiresIn: "1d",
    });
    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
    return tokenReturn;
  }
}

export { AuthenticatedUseCase };
