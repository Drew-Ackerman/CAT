import { db } from "~/server/db";
import { ICat, INotes, IUser } from "~/types";

interface IData extends INotes {
    cat: ICat,
    researcher: IUser,
  }

export async function getAllNotes(): Promise<Array<IData>>{
    const data = await db.query.notes.findMany({
        with: {
          cat: true,
          researcher: true,
        },  
    }) || [];
    return data;
}