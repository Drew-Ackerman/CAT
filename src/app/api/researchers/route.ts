import { db } from "~/server/db";
import { researchers } from "~/server/db/schema";
import type { IResearcher } from "~/types";

export async function GET(_request: Request) {
  const data = await db.select().from(researchers);
  return Response.json(data);
}

export async function POST(request: Request) {
  const { name } = (await request.json()) as IResearcher;
  const [insertedItem] = await db.insert(researchers).values({ name }).returning();
  return Response.json(insertedItem);
}
