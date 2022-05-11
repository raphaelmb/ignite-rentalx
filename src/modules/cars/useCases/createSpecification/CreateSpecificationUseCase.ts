import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExisits =
      await this.specificationsRepository.findByName(name);
    if (specificationAlreadyExisits) {
      throw new Error("Specification already exists.");
    }
    await this.specificationsRepository.create({ name, description });
  }
}
