import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest{
    user_id: string
    id: string
}
@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository:IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository:ICarsRepository
    
    ){}
  async execute({user_id,id}:IRequest) {
      
  }
}

export { DevolutionRentalUseCase };
