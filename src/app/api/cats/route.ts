import { db } from "~/server/db";
import { cats } from "~/server/db/schema";
import type { ICat } from "~/types";

export async function GET(_request: Request) {
  const data = await db.select().from(cats);
  return Response.json(data);
}

export async function POST(request: Request) {
  const { name, tag, color, sex } = (await request.json()) as ICat;
  const [insertedItem] = await db.insert(cats).values({ name, tag, color, sex }).returning();
  return Response.json(insertedItem);
}
