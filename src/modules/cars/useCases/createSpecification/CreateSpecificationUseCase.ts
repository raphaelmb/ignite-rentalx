import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExisits =
      this.specificationsRepository.findByName(name);
    if (specificationAlreadyExisits) {
      throw new Error("Specification already exists.");
    }
    this.specificationsRepository.create({ name, description });
  }
}
