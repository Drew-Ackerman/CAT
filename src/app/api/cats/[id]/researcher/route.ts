import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { cats } from "~/server/db/schema";

export async function PATCH(request: Request, { params }: { params: { id: number } }) {
  const { id } = params;
  const updatedValues = (await request.json()) as { researcherId: number };
  const [updatedRecord] = await db.update(cats).set(updatedValues).where(eq(cats.id, id)).returning();
  return Response.json(updatedRecord);
}
