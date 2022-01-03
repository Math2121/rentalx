import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/createCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";


const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarsSpecificationController =
  new CreateCarSpecificationController();
carsRoutes.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get(
  "/available",
  listAvailableCarsController.handle
);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticate,
  ensureAdmin,
  createCarsSpecificationController.handle
);
export { carsRoutes };
