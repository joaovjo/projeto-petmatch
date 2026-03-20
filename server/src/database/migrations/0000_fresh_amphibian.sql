CREATE TYPE "public"."especie_enum" AS ENUM('Cachorro', 'Gato', 'Outro');--> statement-breakpoint
CREATE TYPE "public"."porte_enum" AS ENUM('P', 'M', 'G');--> statement-breakpoint
CREATE TYPE "public"."sexo_enum" AS ENUM('M', 'F');--> statement-breakpoint
CREATE TABLE "account" (
	"id" uuid PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ong" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cnpj" char(14) NOT NULL,
	"razao_social" varchar(255) NOT NULL,
	"nome_fantasia" varchar(255) NOT NULL,
	"telefone" char(11) NOT NULL,
	"whatsapp" char(13),
	"email" varchar(255) NOT NULL,
	"site" varchar(255),
	"instagram" varchar(255) NOT NULL,
	"url_imagem" text NOT NULL,
	"cep" char(8) NOT NULL,
	"uf" char(2) NOT NULL,
	"cidade" varchar(255) NOT NULL,
	"bairro" varchar(255) NOT NULL,
	"logradouro" varchar(255) NOT NULL,
	"numero" integer NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "ong_cnpj_unique" UNIQUE("cnpj"),
	CONSTRAINT "ong_email_unique" UNIQUE("email"),
	CONSTRAINT "ong_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "pet" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(255) NOT NULL,
	"especie" "especie_enum" NOT NULL,
	"raca" varchar(100) NOT NULL,
	"sexo" "sexo_enum" NOT NULL,
	"porte" "porte_enum" NOT NULL,
	"data_nascimento" date NOT NULL,
	"descricao" text NOT NULL,
	"url_imagem" text NOT NULL,
	"adotado" boolean DEFAULT false NOT NULL,
	"ong_id" uuid NOT NULL,
	"tutor_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "pet_owner_check" CHECK ("pet"."ong_id" IS NOT NULL OR "pet"."tutor_id" IS NOT NULL),
	CONSTRAINT "pet_sexo_check" CHECK ("pet"."sexo" IN ('M', 'F')),
	CONSTRAINT "pet_porte_check" CHECK ("pet"."porte" IN ('P', 'M', 'G'))
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" uuid PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" uuid NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" uuid PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ong" ADD CONSTRAINT "ong_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pet" ADD CONSTRAINT "pet_ong_id_ong_id_fk" FOREIGN KEY ("ong_id") REFERENCES "public"."ong"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pet" ADD CONSTRAINT "pet_tutor_id_user_id_fk" FOREIGN KEY ("tutor_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "ong_userId_idx" ON "ong" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "pet_ongId_idx" ON "pet" USING btree ("ong_id");--> statement-breakpoint
CREATE INDEX "pet_tutorId_idx" ON "pet" USING btree ("tutor_id");--> statement-breakpoint
CREATE INDEX "pet_adotado_idx" ON "pet" USING btree ("adotado");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");