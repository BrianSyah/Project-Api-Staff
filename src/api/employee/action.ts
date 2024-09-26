import { eq } from "drizzle-orm";
import { db } from "../../db";
import { employee, NewStaff, Staffs, UpdateStaff } from "./schema";

export function getStaffs(): Promise<Staffs[]> {
  return db.query.employee.findMany();
}

export function getStaffsByNip(nip: string): Promise<Staffs | undefined> {
  return db.query.employee.findFirst({
    where: (staff, { eq }) => eq(staff.nip, nip),
  });
}

export function insertNewStaff(staff: NewStaff): Promise<Staffs> {
  return db
    .insert(employee)
    .values(staff)
    .returning()
    .then(([insertedStaff]) => insertedStaff);
}

export function updatestaff(nip: string, staff: UpdateStaff): Promise<Staffs> {
  return db
    .update(employee)
    .set({ ...staff })
    .where(eq(employee.nip, nip))
    .returning()
    .then(([updatedStaff]) => updatedStaff);
}

export function deleteStaffBynip(nip: string): Promise<Staffs> {
  return db
    .delete(employee)
    .where(eq(employee.nip, nip))
    .returning()
    .then(([deletedStaff]) => deletedStaff);
}
