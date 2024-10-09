import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { researchers } from "~/server/db/schema";

/** api/researchers/[id] */

export async function GET(_request: Request, { params }: { params: { id: number } }) {
  const data = await db.query.researchers.findFirst({
    where: eq(researchers.id, params.id),
    with: {
      notes: {
        with: {
          cat: true,
        },
      },
      cats: true,
    },
  });
  return Response.json(data);
}

export async function DELETE(_request: Request, { params }: { params: { id: number } }) {
  const [deletedRecord] = await db.delete(researchers).where(eq(researchers.id, params.id)).returning();
  return Response.json(deletedRecord);
}

// export async function PATCH(request: Request, {params}: {params: {id: number}}) {
//     const {id} = params;
//     const updatedValues = (await request.json()) as ICat;
//     console.log(id, updatedValues);
//     const [updatedRecord] = await db.update(cats)
//       .set(updatedValues)
//       .where(eq(cats.id, id))
//       .returning();
//     return Response.json(updatedRecord);
//   }
