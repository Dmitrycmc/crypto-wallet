import { DataSource } from 'typeorm';
import { Wallet } from '../entities';

export const getPostresDataSource = (): DataSource => new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'postgres',
    entities: [Wallet],
    synchronize: true,
    logging: false,
});