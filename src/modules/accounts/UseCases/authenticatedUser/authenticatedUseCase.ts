import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

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
  refresh_token: string;
}
@injectable()
class AuthenticatedUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository,
    @inject("UsersTokensRepository")
    private userTokensRespository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    // verifica se o usuário  existe
    const user = await this.usersRepository.findByEmail(email);
    const {
      secret,
      expires_in_token,
      secret_refresh_token,
      expires_in_refersh_token,
      expires_refresh_token_days,
    } = auth;
    if (!user) {
      throw new AppError("E-mail or password incorrect");
    }

    // verifica se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("E-mail or password incorrect");
    }

    //Gerar JWT

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    //Cria o refres Token
    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refersh_token,
    });

    //devolve o dia de expiração
    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      expires_refresh_token_days
    );
    
    //registra o token
    await this.userTokensRespository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: user.id,
      
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };
    return tokenReturn;
  }
}

export { AuthenticatedUseCase };
