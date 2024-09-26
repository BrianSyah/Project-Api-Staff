CREATE TABLE IF NOT EXISTS "employee" (
	"id" serial PRIMARY KEY NOT NULL,
	"nip" varchar,
	"name" varchar,
	"email" varchar(64),
	"phone_number" varchar(12),
	"hire_date" date,
	"division_id" integer,
	"salary" bigint,
	"is_manager" boolean DEFAULT false,
	"manager_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "division" (
	"id" serial PRIMARY KEY NOT NULL,
	"division_name" varchar(100) NOT NULL,
	"room_number" integer NOT NULL,
	"description" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"update_at" timestamp with time zone DEFAULT now() NOT NULL,
	"manager_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee_project" (
	"employee_id" integer NOT NULL,
	"project_id" integer NOT NULL,
	"role" varchar(100) NOT NULL,
	CONSTRAINT "employee_project_employee_id_project_id_pk" PRIMARY KEY("employee_id","project_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_name" varchar(100) NOT NULL,
	"budget" bigint NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"status" varchar(100) NOT NULL,
	"division_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "division" ADD CONSTRAINT "division_manager_id_employee_id_fk" FOREIGN KEY ("manager_id") REFERENCES "public"."employee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_project" ADD CONSTRAINT "employee_project_employee_id_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_project" ADD CONSTRAINT "employee_project_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_division_id_division_id_fk" FOREIGN KEY ("division_id") REFERENCES "public"."division"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "employee_nip_index" ON "employee" USING btree ("nip");