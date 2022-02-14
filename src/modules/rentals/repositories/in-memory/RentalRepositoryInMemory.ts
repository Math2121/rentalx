import { ICreateRentalDTO } from "@modules/rentals/dto/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalRepositoryInMemory implements IRentalsRepository {
  findByUserId(user_id: string): Promise<Rental[]> {
    throw new Error("Method not implemented.");
  }
  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
  rentals: Rental[] = [];
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }
  findById(id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
}

export { RentalRepositoryInMemory };
