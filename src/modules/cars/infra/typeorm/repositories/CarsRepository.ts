import { getRepository, Repository } from "typeorm";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = getRepository(Car);
  }
 
  async create({
    name,
    license_plate,
    brand,
    daily_rate,
    description,
    category_id,
    fine_amount,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      license_plate,
      brand,
      daily_rate,
      description,
      category_id,
      fine_amount,
    });

    await this.repository.save(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }
  findAllAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    throw new Error("Method not implemented.");
  }
}

export { CarsRepository };
