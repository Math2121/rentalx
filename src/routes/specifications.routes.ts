import { createSpecificationController } from "../modules/cars/useCases/createSpecification";
import { Router } from "express";
const specificationRoutes = Router();

specificationRoutes.post("/", (req, res) => {
  return createSpecificationController.handle(req, res);
});
export { specificationRoutes };
