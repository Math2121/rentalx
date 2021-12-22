import { Response,Request } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request, response: Response):Promise<Response> {
    const {
      name,
      license_plate,
      brand,
      daily_rate,
      description,
      category_id,
      fine_amount,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      license_plate,
      brand,
      daily_rate,
      description,
      category_id,
      fine_amount,
    });

    return response.status(201).json(car);
  }
}
export {CreateCarController}