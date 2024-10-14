import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { notes } from "~/server/db/schema";

export async function DELETE(_request: Request, { params }: { params: { id: number } }) {
  const [deletedRecord] = await db.delete(notes).where(eq(notes.id, params.id)).returning();
  return Response.json(deletedRecord);
}
