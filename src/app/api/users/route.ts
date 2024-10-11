import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import type { IUser } from "~/types";

export async function GET(_request: Request) {
  const data = await db.select().from(users);
  return Response.json(data);
}

export async function POST(request: Request) {
  const { name, email, role } = (await request.json()) as IUser;
  const [insertedItem] = await db.insert(users)
    .values({ name, email, role })
    .returning();
  return Response.json(insertedItem);
}
