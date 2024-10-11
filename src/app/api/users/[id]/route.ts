import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";


/** /api/users/[id] */

export async function GET(_request: Request, { params }: { params: { id: number } }) {
    const data = await db.query.users.findFirst({
      where: eq(users.id, params.id),
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

export async function PATCH(request: Request, { params }: { params: { id: number } }){
    const { id } = params;
    const updatedValues = (await request.json()) as { name: string };
    const [updatedRecord] = await db.update(users)
        .set(updatedValues)
        .where(eq(users.id, id))
        .returning();
    return Response.json(updatedRecord);
}