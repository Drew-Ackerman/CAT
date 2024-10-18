import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { cats } from "~/server/db/schema";
import type { ICat } from "~/types";

/** api/cats/[id] */

export async function GET(_request: Request, { params }: { params: { id: number } }) {
  const cat = await db.query.cats.findFirst({
    where: eq(cats.id, params.id),
    with: {
      notes: true,
    },
  });
  return Response.json(cat);
}

export async function PATCH(request: Request, { params }: { params: { id: number } }) {
  const { id } = params;
  const updatedValues = (await request.json()) as ICat;
  const [updatedRecord] = await db.update(cats).set(updatedValues).where(eq(cats.id, id)).returning();
  return Response.json(updatedRecord);
}

export async function DELETE(_request: Request, { params }: { params: { id: number } }) {
  const { id } = params;
  const [deletedRecord] = await db.delete(cats)
    .where(eq(cats.id, id))
    .returning()
  return Response.json(deletedRecord);
}