import * as dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, Book, Borrowing } from "./entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Book, Borrowing],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Loaded the database...");
  })
  .catch((error) => console.log(error));
