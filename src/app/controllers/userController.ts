import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import type { IUser } from "~/types";

export async function getAllUsers(): Promise<Array<IUser>> {
    const data = await db.select().from(users);
    return data;
}