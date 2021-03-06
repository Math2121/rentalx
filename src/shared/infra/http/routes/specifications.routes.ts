import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController()


specificationRoutes.post("/", ensureAuthenticate, ensureAdmin, createSpecificationController.handle);
export { specificationRoutes };
