import "reflect-metadata"
import { DataSource } from "typeorm"
import { Prices, Stocks } from "./entity"

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [Prices, Stocks],
  migrations: [],
  subscribers: [],
})
