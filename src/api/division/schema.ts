import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const division = pgTable("division", {
  id: serial("id").primaryKey(),
  divison_name: varchar("division_name", { length: 100 }).notNull(),
  room_number: integer("room_number").notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  update_at: timestamp("update_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
