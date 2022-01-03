import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificattionsRepositoryInMemory: SpecificationsRepositoryInMemory;
describe("Create Car Specification", () => {
  beforeEach(() => {
    specificattionsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificattionsRepositoryInMemory
    );
  });
  it("should not be able to add a new specification to non-existent  car", async () => {
    expect(async () => {
      const car_id = "125";
      const specifications_id = ["522"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should  be able to add a new specification to the   car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "ABC-1234",
      brand: "Brand",
      category_id: "category",
      fine_amount: 60,
    });

    const specification = await specificattionsRepositoryInMemory.create({
      description: "test",
      name: "test",
    });

    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
