import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { isAdmin } from "~/app/api/utils";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

/** /api/users/[id]/role */

/**
 * Update a specific users role
 * @returns The updated record.
 */
export async function PATCH(request: NextRequest, { params }: { params: { id: number } }) {
  if(!(await isAdmin(request))){
    return NextResponse.json({message: "Forbidden"}, {status: 403});
  }

  const { id } = params;
  const updatedRole = (await request.json()) as "admin" | "user";
  const [updatedRecord] = await db.update(users).set({ role: updatedRole }).where(eq(users.id, id)).returning();
  return Response.json(updatedRecord);
}
