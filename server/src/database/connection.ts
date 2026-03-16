import { drizzle } from "drizzle-orm/bun-sql";
import { SQL } from "bun";

const connection = new SQL("postgresql://postgres:123456@localhost:5432/db_petmatch")
export const db = drizzle(connection, {logger: true});