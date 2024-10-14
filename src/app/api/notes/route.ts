import { db } from "~/server/db";
import { notes } from "~/server/db/schema";
import type { INotes } from "~/types";

export async function GET(_request: Request) {
  const notes = await db.query.notes.findMany({
    with: {
      cat: true,
      researcher: true,
    },
  });
  return Response.json(notes);
}

export async function POST(request: Request) {
  const { text, catId, researcherId, temperament, radioactivity } = (await request.json()) as INotes;
  const [insertedItem] = await db
    .insert(notes)
    .values({ text, temperament, radioactivity, catId, researcherId })
    .returning();
  return Response.json(insertedItem);
}
