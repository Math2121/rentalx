import { createConnection } from "typeorm";

createConnection({
  type: "postgres",
  port: 5432,
  host: "localhost",
  username: "docker",
  password: "ignite",
  database: "rentx",
});
