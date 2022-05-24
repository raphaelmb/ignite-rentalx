import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import SpecificationsRepositoryInMemory from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a non existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];
    expect(
      async () =>
        await createCarSpecificationUseCase.execute({
          car_id,
          specifications_id,
        })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });
    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "specification",
    });
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
