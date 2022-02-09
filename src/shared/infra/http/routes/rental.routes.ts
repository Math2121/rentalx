import { createRentalController } from "@modules/rentals/useCases/createRental/createRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const rentalRouter = Router();

const CreateRentalController = new createRentalController();
const devolutionRentalController = new DevolutionRentalController();
rentalRouter.post("/", ensureAuthenticate, CreateRentalController.handle);
rentalRouter.post(
  "/devolution/:id",
  ensureAuthenticate,
  devolutionRentalController.handle
);
export { rentalRouter };
