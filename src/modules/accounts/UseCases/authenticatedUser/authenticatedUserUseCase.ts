import { Request,Response } from "express";
import { container } from "tsyringe";
import { AuthenticatedUserUseCase } from "./authenticatedUserController";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUseCase = container.resolve(AuthenticatedUserUseCase);

    const token = await authenticateUseCase.execute({ password, email });

    return response.json(token);
  }
}

export  {AuthenticateUserController}