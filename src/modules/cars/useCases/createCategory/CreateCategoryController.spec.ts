import { app } from "@shared/infra/http/app";
import request from "supertest";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { randomUUID } from "node:crypto";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = randomUUID();
    const password = await hash("admin", 8);
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) VALUES('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'xxx')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest description",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with an existing name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest description",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    expect(response.status).toBe(400);
  });
});
