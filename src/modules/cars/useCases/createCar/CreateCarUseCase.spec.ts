import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;
describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it("should be able create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "ABC-DEF",
      brand: "Brand",
      category_id: "dfdf",
      fine_amount: 60,
    });
    expect(car).toHaveProperty("id")
  });

  it("should not to be able create a car with exists license_palte", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car",
        description: "Car Test",
        daily_rate: 100,
        license_plate: "ABC-DEF",
        brand: "Brand",
        category_id: "dfdf",
        fine_amount: 60,
      });

      await createCarUseCase.execute({
        name: "Name Car",
        description: "Car Test",
        daily_rate: 100,
        license_plate: "ABC-DEF",
        brand: "Brand",
        category_id: "dfdf",
        fine_amount: 60,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not to be able create a car with exists license_palte", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car",
        description: "Car Test",
        daily_rate: 100,
        license_plate: "ABC-DEF",
        brand: "Brand",
        category_id: "dfdf",
        fine_amount: 60,
      });

      await createCarUseCase.execute({
        name: "Name Car",
        description: "Car Test",
        daily_rate: 100,
        license_plate: "ABC-DEF",
        brand: "Brand",
        category_id: "dfdf",
        fine_amount: 60,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not  be able create a car with available not tru by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "ABC-DEF",
      brand: "Brand",
      category_id: "dfdf",
      fine_amount: 60,
    });

    expect(car.available).toBe(true);
  });
});
