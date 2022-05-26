import dayjs from "dayjs";
import AppError from "@shared/errors/AppError";
import RentalsRepositoryInMemory from "../repositories/in-memory/RentalsRepositoryInMemory";
import CreateRentalUseCase from "./CreateRentalUseCase";
import DayjsDateProvider from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123",
      car_id: "1212",
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is a rental open to the same user", async () => {
    await createRentalUseCase.execute({
      user_id: "123",
      car_id: "1212",
      expected_return_date: dayAdd24Hours,
    });
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "1213",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is a rental open to the same car", async () => {
    await createRentalUseCase.execute({
      user_id: "123",
      car_id: "1212",
      expected_return_date: dayAdd24Hours,
    });
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "1212",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "1212",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
