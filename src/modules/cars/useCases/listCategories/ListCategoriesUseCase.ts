import Category from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export default class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.list();
  }
}
