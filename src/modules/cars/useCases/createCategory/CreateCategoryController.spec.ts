import { app } from "@shared/infra/http/app";
import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `insert into users(id,name,email,password,"isAdmin",created_at,driver_license) values('${id}','admin','admin@rentx.com.br','${password}',true,'now()','xxxx')`
    );
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Test",
        description: "Category Supertest",
      })
      .set({ Authorization: `Bearer ${refresh_token}` });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with the same name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Test",
        description: "Category Supertest",
      })
      .set({ Authorization: `Bearer ${refresh_token}` });

    expect(response.status).toBe(400);
  });
});
