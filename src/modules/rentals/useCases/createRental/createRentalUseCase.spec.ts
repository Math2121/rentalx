import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";

import { CreateRentalUseCase } from "./createRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory;
let dayJsProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    dayJsProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayJsProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "idk2",
      brand: "Car Brand",
      fine_amount: 60,
      category_id: "category",
    });
    const rental = await createRentalUseCase.execute({
      user_id: "2555",
      car_id: car.id as string,
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("should not be able to create a new rental if there is another open to the same user", async () => {
     await rentalRepositoryInMemory.create({
     car_id:"11111",
     expected_return_date:dayAdd24Hours,
     user_id: "2555",
    })

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "11111",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unvailable"));
  });
  // it("should not be able to create a new rental if there is another open to the same car", async () => {
  //   await rentalsre.execute({
  //     user_id: "123",
  //     car_id: "12",
  //     expected_return_date: dayAdd24Hours,
  //   });
  //   expect(createRentalUseCase.execute({
  //       user_id: "321",
  //       car_id: "12",
  //       expected_return_date: dayAdd24Hours,
  //     })
  //   ).rejects.toEqual(new AppError("Car is unavailable"));
  // });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect( createRentalUseCase.execute({
        user_id: "321",
        car_id: "12",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
