import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
  async create({
    brand,
    name,
    description,
    license_plate,
    category_id,
    daily_rate,
    fine_amount,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      name,
      description,
      license_plate,
      category_id,
      daily_rate,
      fine_amount,
      id,
    });
    this.cars.push(car);

    return car;
  }
  async findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand == brand) ||
        (category_id && car.category_id == category_id) ||
        (name && car.name == name)
      ) {
        return car;
      }
      return null;
    });

    return cars;
  }
  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
  async updatedAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
