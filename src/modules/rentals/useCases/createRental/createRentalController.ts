import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./createRentalUseCase";

class createRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createRentalUseCase = container.resolve(CreateRentalUseCase);
    const { expected_return_date, car_id } = request.body;
    const { id } = request.user;
    const rental = await createRentalUseCase.execute({
      user_id: id,
      car_id,
      expected_return_date,
    });

    return response.status(201).json(rental);
  }
}

export { createRentalController };
