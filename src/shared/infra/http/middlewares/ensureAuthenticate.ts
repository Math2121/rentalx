
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";
interface IPayload {
  sub: string;
}
export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //retorna o token no header da requisição
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UsersTokensRepository()
  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");
 
  try {
    // verifica se o token e válido
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;
    //Verifica se o usuário e válido
    const user = await userTokensRepository.findByUserIdAndRefershToken(user_id,token);
    if (!user) {
      throw new AppError("User does not exists!", 401);
    }
    request.user = { id: user_id };
    next();
  } catch (error) {
  
    console.error(error);
    throw new AppError("Invalid Token", 401);
  }
}
