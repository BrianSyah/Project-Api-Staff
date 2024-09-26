ALTER TABLE "division" DROP CONSTRAINT "division_manager_id_employee_id_fk";
--> statement-breakpoint
ALTER TABLE "employee" ALTER COLUMN "nip" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ALTER COLUMN "phone_number" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ALTER COLUMN "hire_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ALTER COLUMN "division_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ALTER COLUMN "salary" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ALTER COLUMN "is_manager" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ALTER COLUMN "manager_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "update_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "update_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "employee_email_index" ON "employee" USING btree ("email");--> statement-breakpoint
ALTER TABLE "division" DROP COLUMN IF EXISTS "manager_id";