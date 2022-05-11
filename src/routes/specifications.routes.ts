import { Router } from "express";
import CreateSpecificationController from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createCategoryController = new CreateSpecificationController();

specificationsRoutes.post("/", createCategoryController.handle);

export { specificationsRoutes };
