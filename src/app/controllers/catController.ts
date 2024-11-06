import { db } from "~/server/db";
import { cats } from "~/server/db/schema";
import type { ICat } from "~/types";

export async function getAllCats(): Promise<Array<ICat>>{
    const allCats = await db.select().from(cats);
    return allCats;
}