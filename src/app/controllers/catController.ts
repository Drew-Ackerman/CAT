import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { cats } from "~/server/db/schema";
import type { ICat, INotes, IUser } from "~/types";

export async function getAllCats(): Promise<Array<ICat>>{
    const allCats = await db.select().from(cats);
    return allCats;
}

interface Data extends ICat {
    notes: Array<INotes> | null,
    researcher: IUser | null,
}

export async function getCat(catId: number) : Promise<Data | undefined>{
    const cat = await db.query.cats.findFirst({
        where: eq(cats.id, catId),
        with: {
            notes: true,
            researcher:true,
        }
    });
    return cat;
}

export async function getACatsResearcher(catId: number): Promise<IUser | null | undefined>{
    const theCat = await db.query.cats.findFirst({
        where: eq(cats.id, catId),
        with: {
            researcher:true,
        }
    });
    return theCat?.researcher;
}