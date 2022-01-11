import { createRentalController } from "@modules/rentals/useCases/createRentalController";
import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const rentalRouter = Router();

const CreateRentalController = new createRentalController();

rentalRouter.post("/", ensureAuthenticate, CreateRentalController.handle);
export { rentalRouter };
