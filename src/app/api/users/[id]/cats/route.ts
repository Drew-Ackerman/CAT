import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { cats } from "~/server/db/schema";

export async function GET(_request: Request, { params }: { params: {id: number } }){
    const { id: userId } = params;
    const catsAssignedToUser = await db.query.cats.findMany({
        columns: {
            id: true,
        },
        where: eq(cats.researcherId, userId),
    }).then((records) => {
        const catIds = records.map((obj) => { return obj.id });
        return catIds
    })

    return Response.json(catsAssignedToUser);
}