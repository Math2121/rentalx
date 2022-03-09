import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase
    );
    try {
      await sendForgotPasswordMailUseCase.execute(email);
      return response.send();
    } catch (error) {
      console.log(error);
      return response.json(error).status(500);
    }
   
  }
}

export { SendForgotPasswordMailController };
