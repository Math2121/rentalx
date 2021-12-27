import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(request: Request, response: Response) {
    const { brand, name, category_id } = request.query;

    const listAvailbaleCarsUseCase = container.resolve(ListCarsUseCase);

    const cars = listAvailbaleCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });
    
    return response.json(cars)
  }
}

export {ListAvailableCarsController}