import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { type IUser } from "~/types";
import { isAdmin } from "../utils";
import { getAllUsers } from "~/app/controllers/userController";

/** /api/users */

/**
 * @returns A list of all Users in the database
 */
export async function GET(request: NextRequest) {
  if(!(await isAdmin(request))){
    return NextResponse.json({message: "Forbidden"}, {status: 403});
  }
  return NextResponse.json(getAllUsers());
}

/**
 * Add a user to the database
 * @param request IUser 
 * @returns The inserted user
 */
export async function POST(request: NextRequest) {
  if(!(await isAdmin(request))){
    return NextResponse.json({message: "Forbidden"}, {status: 403});
  }

  const { name, email, role } = await request.json() as IUser
  const [insertedUser] = await db.insert(users).values({ name, email, role }).returning();
  return Response.json(insertedUser);
}
