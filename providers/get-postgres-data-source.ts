import { DataSource } from "typeorm";
import { Wallet } from "../entities/wallet";

export const getPostresDataSource = (): DataSource => new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "user",
    database: "postgres",
    entities: [Wallet],
    synchronize: true,
    logging: false,
});