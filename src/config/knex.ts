import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const knexConfig: Knex.Config = {
  client: "mysql2",
  connection: {
     host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: Number(process.env.MYSQL_PORT) || 3306,
  },
  pool: {
    min: 2,
    max: 10,
  },
   migrations: {
    directory: "src/migrations",
  },
};

export default knexConfig;

