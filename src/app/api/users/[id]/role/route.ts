import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function PATCH(request: Request, { params }: { params: { id: number } }) {
  const { id } = params;
  const updatedRole = (await request.json()) as "admin" | "user";
  console.log(id, updatedRole);
  const [updatedRecord] = await db.update(users).set({ role: updatedRole }).where(eq(users.id, id)).returning();
  return Response.json(updatedRecord);
}
