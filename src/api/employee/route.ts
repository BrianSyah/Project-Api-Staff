import { Hono } from "hono";
import { employee, NewStaffSchema, UpdateStaffSchema } from "./schema";
import { db } from "../../db";
import { getStaffsByNip, insertNewStaff, updatestaff } from "./action";
import { zValidator } from "@hono/zod-validator";
import { eq, sql } from "drizzle-orm";
const app = new Hono();

// GET all data employee
app.get("/employee", async (c) => {
  const data = await db.select().from(employee);
  return c.json(
    {
      message: "Success Get all data",
      data,
    },
    200
  );
});

// GET data employee by name

app.get("/employee/:nip", async (c) => {
  const staff = await getStaffsByNip(c.req.param("nip"));

  if (!staff) {
    return c.json(
      {
        message: "Data not found",
        data: {},
      },
      404
    );
  }

  return c.json({
    message: "Success Get data by nip",
    data: staff,
  });
});

// POST data employee
app.post(
  "/employee",
  zValidator("json", NewStaffSchema, (result, c) => {
    if (!result.success) {
      c.status(400);
      return c.json(result.error);
    }
  }),
  async (c) => {
    const staff = c.req.valid("json");
    const id = crypto.getRandomValues(new Uint32Array(1))[0];
    const insertedStaff = await insertNewStaff({ ...staff, id });

    return c.json(
      {
        message: "Succes Create Data",
        data: insertedStaff,
      },
      201
    );
  }
);

// PATCH Update data employee
app.patch(
  "/employee/:nip",
  zValidator("json", UpdateStaffSchema, (result, c) => {
    if (!result.success) {
      c.status(400);
      return c.json(result.error);
    }
  }),
  async (c) => {
    try {
      const updatedStaff = await updatestaff(
        c.req.param("nip"),
        c.req.valid("json")
      );

      if (updatedStaff) {
        return c.json(
          {
            message: "Succes Update Data",
            data: updatedStaff,
          },
          200
        );
      }
      c.status(422);
      return c.json({
        message: "Failed Update Data",
        data: {},
      });
    } catch (error) {
      c.status(500);
      return c.json({
        message: "Error Something Wrong",
        data: {},
      });
    }
  }
);

app.delete("/employee/:nip", async (c) => {
  const nip = c.req.param("nip");
  const deletedStaff = await db
    .delete(employee)
    .where(sql`${employee.nip} = ${nip}`)
    .returning();

  if (!deletedStaff) {
    c.status(422);
    return c.json({
      message: "Failed Delete Data",
      data: {},
    });
  }

  return c.json({
    message: "Succes Delete Data",
    data: null,
  });
});

export default app;
