import { Rental } from "@modules/rentals/infra/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository
  ) {}
  async execute(user_id: string): Promise<Rental[]> {
    const rentalByUser = await this.rentalsRepository.findByUserId(user_id);

    return rentalByUser;
  }
}

export { ListRentalByUserUseCase };
