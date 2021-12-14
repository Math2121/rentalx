import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  brand: string;
  category_id: string;
  fine_amount: number;
}
//@injectable()
class CreateCarUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    brand,
    category_id,
    fine_amount,
  }: IRequest): Promise<void> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );
    if (carAlreadyExists) {
      throw new AppError("Car Already Exists");
    }
    await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      brand,
      category_id,
      fine_amount,
    });
  }
}

export { CreateCarUseCase };
