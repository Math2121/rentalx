import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = [];
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car)=>car.license_plate === license_plate)
 }
  async create({
    brand,
    name,
    description,
    license_plate,
    category_id,
    daily_rate,
    fine_amount,
  }: ICreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, {
      brand,
      name,
      description,
      license_plate,
      category_id,
      daily_rate,
      fine_amount,
    });
    this.cars.push(car)
  }
}

export { CarsRepositoryInMemory };
