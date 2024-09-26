import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/drizzle/migrations", // Tempat output file migrasi
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.POSTGRES_HOST as string,
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
  },
});

// import { defineConfig } from "drizzle-kit";
// import "dotenv/config";

// export default defineConfig({
//   schema: "./src/api/db/schema.ts",
//   out: "./drizzle",
//   dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'\
//   //   driver: "pos"
//   dbCredentials: {
//     ssl: false,
//     host: "127.0.0.1",
//     user: process.env.POSTGRES_USER ?? "",
//     password: process.env.POSTGRES_PASSWORD ?? "",
//     database: process.env.POSTGRES_DB ?? "",
//   },
// });
