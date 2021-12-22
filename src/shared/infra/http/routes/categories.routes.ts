import { Router } from "express";
import multer from "multer";


import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const upload = multer({
  dest: "./tmp",
});

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();


categoriesRoutes.post("/",ensureAuthenticate,ensureAdmin, createCategoryController.handle);

categoriesRoutes.get("/",ensureAuthenticate,ensureAdmin, listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);
export { categoriesRoutes };
