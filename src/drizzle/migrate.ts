import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST } =
  process.env;

// for migrations
const migrationClient = postgres(
  `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${
    POSTGRES_HOST || "0.0.0.0"
  }:5432/${POSTGRES_DB}`,
  { max: 1 }
);

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/drizzle/migrations",
  });

  await migrationClient.end();
}

main();
