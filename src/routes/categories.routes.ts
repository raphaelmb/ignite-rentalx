import { Router } from "express";

import CategoriesRepository from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;
  const categoryAlreadyExsits = categoriesRepository.findByName(name);
  if (categoryAlreadyExsits) {
    return response.status(400).json({ error: "Category already exists." });
  }
  categoriesRepository.create({ name, description });
  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoriesRepository.list();
  return response.json(categories);
});

export { categoriesRoutes };
