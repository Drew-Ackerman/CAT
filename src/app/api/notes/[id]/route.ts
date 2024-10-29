import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { notes } from "~/server/db/schema";
import { isAdmin } from "../../utils";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
  if(!(await isAdmin(request))){
    return NextResponse.json({message: "Forbidden"}, {status: 403});
  }

  const [deletedRecord] = await db.delete(notes).where(eq(notes.id, params.id)).returning();
  return Response.json(deletedRecord);
}
