import { db } from "~/server/db";
import { cats } from "~/server/db/schema";
import type { ICat } from "~/types";
import { isAdmin } from "../utils";
import { type NextRequest, NextResponse } from "next/server";

/** /api/cats */

export async function GET(request: NextRequest) {
  if(!(await isAdmin(request))){
    return NextResponse.json({message: "Forbidden"}, {status: 403});
  }

  const data = await db.select().from(cats);
  return Response.json(data);
}

export async function POST(request: NextRequest) {
  if(!(await isAdmin(request))){
    return NextResponse.json({message: "Forbidden"}, {status: 403});
  }

  const { name, tag, color, sex } = (await request.json()) as ICat;
  const [insertedItem] = await db.insert(cats)
    .values({ name, tag, color, sex })
    .returning();
  return Response.json(insertedItem);
}
