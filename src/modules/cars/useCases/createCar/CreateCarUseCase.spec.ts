import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import CreateCarUseCase from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });
    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with existing license plate", async () => {
    await createCarUseCase.execute({
      name: "Car1",
      description: "Car1 description",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });
    await expect(
      createCarUseCase.execute({
        name: "Car2",
        description: "Car2 description",
        daily_rate: 100,
        license_plate: "ABC123",
        fine_amount: 10,
        brand: "Brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists."));
  });

  it("should create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });
    expect(car.available).toBe(true);
  });
});
