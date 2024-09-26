import { serve } from "@hono/node-server";
import { Hono } from "hono";
import employee from "./api/employee/route";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "HALLO" });
});

app.route("/", employee);

// const staffSchema = z.object({
//   id: z.number().min(1, "id harus di isi"),
//   name: z.string().min(3, "Nama minimal 3 karakter"),
//   position: z.string().min(3, "Posisi harus di isi"),
//   bornYear: z.number().min(1900, "Tahun lahir harus di isi"),
//   phone_number: z.string().min(1, "Nomor Telepon harus di isi"),
//   email: z.string().min(1, "Email harus di isi"),
// });

// type staffs = z.infer<typeof staffSchema>;

// Data Dummy

// GET data staff by id
// app.get("/staff/:id", (c) => {
//   const id = Number(c.req.param("id"));
//   const staffById = staffsData.find((data) => data.id === id);

//   if (staffById) {
//     return c.json(
//       {
//         message: "Success Get data by id",
//         data: staffById,
//       },
//       200
//     );
//   }

//   return c.json(
//     {
//       message: "Failed Get data by id",
//       data: {},
//     },
//     404
//   );
// });

// Add data staff
// app.post("/staff", async (c) => {
//   try {
//     const newStaff: staffs = staffSchema.parse(await c.req.json());

//     staffsData.push(newStaff);
//     return c.json(
//       {
//         message: "Success Create data",
//         data: newStaff,
//       },
//       201
//     );
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       const formattedErrors = error.errors.map((err) => ({
//         message: err.message,
//         path: err.path,
//       }));

//       return c.json(
//         {
//           message: "Failed Create data",
//           errors: formattedErrors,
//           data: {},
//         },
//         400
//       );
//     }

//     return c.json(
//       {
//         message: "Error Something Wrong",
//         data: {},
//       },
//       500
//     );
//   }
// });

// Update data staff by id
// app.patch("/staff/:id", async (c) => {
//   try {
//     const id = Number(c.req.param("id"));
//     const staffIndex = staffsData.findIndex((data) => data.id === id);

//     if (staffIndex === -1) {
//       return c.json(
//         {
//           message: "Failed update data by id",
//         },
//         404
//       );
//     }

//     const updateData = staffSchema.parse(await c.req.json());

//     staffsData[staffIndex] = { ...staffsData[staffIndex], ...updateData };

//     return c.json(
//       {
//         message: "Success update data by id",
//         data: staffsData[staffIndex],
//       },
//       200
//     );
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       const formattedErrors = error.errors.map((err) => ({
//         message: err.message,
//         path: err.path,
//       }));

//       return c.json(
//         {
//           message: "Failed update data by id",
//           erros: formattedErrors,
//           data: {},
//         },
//         400
//       );
//     }

//     return c.json(
//       {
//         message: "Error Something Wrong",
//         data: {},
//       },
//       500
//     );
//   }
// });

// DELETE data staff by id
// app.delete("staff/:id", (c) => {
//   const id = Number(c.req.param("id"));
//   const staffIndex = staffsData.findIndex((data) => data.id === id);

//   if (staffIndex === -1) {
//     return c.json(
//       {
//         message: "Failed delete data by id",
//         data: {},
//       },
//       404
//     );
//   }

//   const deletedStaff = staffsData.splice(staffIndex, 1);

//   return c.json(
//     {
//       message: "Success delete data by id",
//       data: deletedStaff[0],
//     },
//     200
//   );
// });

// Delete all data staff
// app.delete("/staff", (c) => {
//   staffsData.splice(0, staffsData.length);

//   return c.json(
//     {
//       message: "Success delete all data",
//       data: {},
//     },
//     200
//   );
// });

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
