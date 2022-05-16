import AppError from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

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
      throw new AppError("Specification already exists.");
    }
    await this.specificationsRepository.create({ name, description });
  }
}
