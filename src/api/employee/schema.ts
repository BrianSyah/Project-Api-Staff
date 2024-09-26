import {
  bigint,
  boolean,
  date,
  integer,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { division } from "../division/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const employee = pgTable(
  "employee",
  {
    id: serial("id").primaryKey(),
    nip: varchar("nip").notNull(),
    name: varchar("name").notNull(),
    email: varchar("email", { length: 64 }).notNull(),
    phone_number: varchar("phone_number", { length: 12 }).notNull(),
    hire_date: date("hire_date").notNull(),
    salary: bigint("salary", { mode: "number" }).notNull(),
    is_manager: boolean("is_manager").default(false).notNull(),
    manager_id: integer("manager_id").notNull(),
    division_id: integer("division_id").notNull(),
    created_by: varchar("created_by").notNull(),
    updated_by: varchar("updated_by").notNull(),
    created_at: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    update_at: timestamp("update_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    // manager_id: integer("manager_id")
    //
    //   .references(() => employee.id),
  },
  (uniqueItems) => ({
    // nameIndex: uniqueIndex().on(staff.name),
    emailIndex: uniqueIndex().on(uniqueItems.email),
    nipIndex: uniqueIndex().on(uniqueItems.nip),
  })
  // (staffByEmail) => ({
  //   emailIndex: uniqueIndex().on(staffByEmail.employee_projet)
  // })
);

export const relationsEmployee = relations(employee, ({ one }) => ({
  manager: one(employee, {
    fields: [employee.manager_id],
    references: [employee.id],
  }),
  division: one(division, {
    fields: [employee.division_id],
    references: [division.id],
  }),
}));

export const StaffSchema = createSelectSchema(employee);
export type Staffs = Zod.infer<typeof StaffSchema>;

// Schema Insert New data staff
export const NewStaffSchema = createInsertSchema(employee, {
  name: (schema) =>
    schema.name
      .min(2, "name should be at least 2 characters")
      .max(60, "name should not exceed 60 characters")
      .regex(/^[a-z]+$/, {
        message: "name should only contain lowercase character",
      }),

  phone_number: (schema) =>
    (schema.phone_number as z.ZodString)
      .regex(/^[0-9]+$/, {
        message: "Phone number should only contain numbers",
      })
      .min(7, "Phone number should be at least 7 digits")
      .max(15, "Phone number should not exceed 15 digits"),
  nip: (schema) =>
    (schema.nip as z.ZodString)
      .regex(/^720[0-9]+$/, {
        message: "NIP should start with 720",
      })
      .max(15, "NIP should not exceed 15 digits")
      .min(10, "NIP should be at least 10 digits"),
});
export type NewStaff = Zod.infer<typeof NewStaffSchema>;

// Schema Updata data staff
export const UpdateStaffSchema = NewStaffSchema.omit({ id: true }).partial();
export type UpdateStaff = Zod.infer<typeof UpdateStaffSchema>;
