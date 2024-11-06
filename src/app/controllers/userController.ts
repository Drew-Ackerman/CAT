import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import type { ICat, INotes, IUser } from "~/types";

export async function getAllUsers(): Promise<Array<IUser>> {
    const data = await db.select().from(users);
    return data;
}

type User = IUser & {
    notes: Array<INotes & { cat: ICat }>;
    cats: ICat[];
};

export async function getUser(userId: number): Promise<User | undefined> {
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
          notes: {
            with: {
              cat: true,
            },
          },
          cats: true,
        },
    });
    return user;
}