require("dotenv").config();
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const connectionString = process.env.DB_URL;

const client = new Client({ connectionString });

const connect = async () => {
  await client.connect();
};

connect();

const db: NodePgDatabase = drizzle(client);

export default db;
