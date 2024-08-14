import "dotenv/config";
import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "db",
    port: 5432,
    user: "postgres",
    password: "postgres",
  },
});

export default db;
