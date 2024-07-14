import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
    dialectOptions: {
        ssl: {
            require: boolean;
            rejectUnauthorized: boolean;
        };
    };
}

const username = process.env.DB_USER as string;
const password = process.env.DB_PASS as string;
const database = process.env.DB_NAME as string;
const host = process.env.DB_HOST as string;

if (!username || !password || !database || !host) {
    throw new Error('Database configuration environment variables must be defined');
}

export const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
    dialectOptions: {}
} as DatabaseConfig);
