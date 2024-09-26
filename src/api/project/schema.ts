import {
  bigint,
  date,
  integer,
  pgTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { employee } from "../employee/schema";
import { division } from "../division/schema";

export const project = pgTable("project", {
  id: serial("id").primaryKey(),
  project_name: varchar("project_name", { length: 100 }).notNull(),
  budget: bigint("budget", { mode: "number" }).notNull(),
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  update_at: timestamp("update_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  status: varchar("status", { length: 100 }).notNull(),
  division_id: integer("division_id").references(() => division.id),
  // manager_id: integer("manager_id")
  //   .notNull()
  //   .references(() => manager.id),
});

export const employee_projet = pgTable(
  "employee_project",
  {
    employee_id: integer("employee_id")
      .notNull()
      .references(() => employee.id),
    project_id: integer("project_id")
      .notNull()
      .references(() => project.id),
    role: varchar("role", { length: 100 }).notNull(),
    // hours_worked: integer("hours_worked").notNull(),
  },
  (employeeProject) => ({
    pk: primaryKey({
      columns: [employeeProject.employee_id, employeeProject.project_id],
    }),
  })
);
