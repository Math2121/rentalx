import { createRentalController } from "@modules/rentals/useCases/createRental/createRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalByUserController } from "@modules/rentals/useCases/listRentalByUser/ListRentalByUserController";
import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const rentalRouter = Router();

const CreateRentalController = new createRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();
rentalRouter.post("/", ensureAuthenticate, CreateRentalController.handle);
rentalRouter.post(
  "/devolution/:id",
  ensureAuthenticate,
  devolutionRentalController.handle
);
rentalRouter.get(
  "/user",
  ensureAuthenticate,
  listRentalByUserController.handle
);
export { rentalRouter };
