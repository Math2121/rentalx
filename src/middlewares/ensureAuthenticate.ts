import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
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
  if (!authHeader) {
    throw new AppError("Token missing",401);
  }
  const [, token] = authHeader.split(" ");
  try {
    // verifica se o token e válido
    const { sub: user_id } = verify(
      token,
      "dkçlwgvwrjfdeigqvr3554541454ferf"
    ) as IPayload;
    //Verifica se o usuário e válido
    const usersRepository = new UserRepository();
    const user = usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("Use does not exists!",401);
    }
    next();
  } catch (error) {
    throw new AppError("Invalid Token",401);
  }
}
