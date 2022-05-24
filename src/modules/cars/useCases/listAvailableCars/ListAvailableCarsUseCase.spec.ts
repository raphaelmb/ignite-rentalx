import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import ListCarsUseCase from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    await carsRepositoryInMemory.create({
      name: "Car name 1",
      description: "Car description 1",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });
    const cars = await listCarsUseCase.execute({});
    expect(cars).toHaveLength(1);
  });

  it("should be able to list all avaible cars by category brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "Car description 1",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 10,
      brand: "TestBrand",
      category_id: "category",
    });
    const cars = await listCarsUseCase.execute({ brand: "TestBrand" });
    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car]);
  });

  it("should be able to list all avaible cars by category name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "CarTest",
      description: "Car description 1",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });
    const cars = await listCarsUseCase.execute({ name: "CarTest" });
    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car]);
  });

  it("should be able to list all avaible cars by category id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "CarTest",
      description: "Car description 1",
      daily_rate: 100,
      license_plate: "ABC123",
      fine_amount: 10,
      brand: "Brand",
      category_id: "1234",
    });
    const cars = await listCarsUseCase.execute({ category_id: "1234" });
    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car]);
  });
});
