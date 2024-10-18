import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import type { IUser } from "~/types";

/** /api/users */

/**
 * @returns A list of all Users in the database
 */
export async function GET() {
  const data = await db.select().from(users);
  return Response.json(data);
}

/**
 * Add a user to the database
 * @param request IUser 
 * @returns The inserted user
 */
export async function POST(request: Request) {
  const { name, email, role } = (await request.json()) as IUser;
  const [insertedUser] = await db.insert(users).values({ name, email, role }).returning();
  return Response.json(insertedUser);
}
