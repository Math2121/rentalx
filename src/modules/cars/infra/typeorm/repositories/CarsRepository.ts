import { getRepository, Repository } from "typeorm";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = getRepository(Car);
  }
  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);
    return car;
  }

  async create({
    name,
    license_plate,
    brand,
    daily_rate,
    description,
    category_id,
    fine_amount,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      license_plate,
      brand,
      daily_rate,
      description,
      category_id,
      fine_amount,
      specifications,
      id,
    });

    await this.repository.save(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }
  async findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }

    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }

    const cars = await carsQuery.getMany();
    console.log(cars);
    return cars;
  }
}

export { CarsRepository };
