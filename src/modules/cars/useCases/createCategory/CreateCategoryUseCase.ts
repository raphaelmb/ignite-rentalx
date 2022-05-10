import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExsits = await this.categoriesRepository.findByName(
      name
    );
    if (categoryAlreadyExsits) {
      throw new Error("Category already exists.");
    }
    this.categoriesRepository.create({ name, description });
  }
}
