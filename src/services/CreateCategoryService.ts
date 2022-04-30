import CategoriesRepository from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExsits = this.categoriesRepository.findByName(name);
    if (categoryAlreadyExsits) {
      throw new Error("Category already exists.");
    }
    this.categoriesRepository.create({ name, description });
  }
}
