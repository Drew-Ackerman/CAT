"use client";

import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import type { ICat, INotes, IUser } from "~/types";
import NotesTable from "../components/notes/NotesTable";
import { LoadingOverlay } from "@mantine/core";
import { useSession } from "next-auth/react";
import Unauthorized from "../components/errors/Unauthorized";

interface IData extends INotes {
  cat: ICat;
  researcher: IUser;
}

const NotesPage = () => {

  const session = useSession();

  //Pull all items and list them
  const { isPending, data } = useQuery({
    queryKey: ["allNotes"],
    queryFn: async () => {
      const response = await fetch("/api/notes");
      return (await response.json()) as IData[];
    },
    enabled: session.status == "authenticated" && session.data.user.role == "admin",
  });

  if(session.status == "unauthenticated" || session.data?.user.role != "admin"){
    return <Unauthorized />
  }

  const deleteRecord = (id: number) => {
    fetch(`/api/notes/${id}`, {
      method: "DELETE",
    })
      .then(async () => {
        notifications.show({
          color: "green",
          title: "Delete Successful",
          message: `Note removed`,
        });
      })
      .catch(async () => {
        notifications.show({
          color: "red",
          title: "Delete Failed",
          message: "Not not removed",
        });
      });
  };

  return (
    <>
      <LoadingOverlay visible={isPending} zIndex={1000} 
        loaderProps={{ color: "lime", type: "dots", size:"lg" }}
        overlayProps={{ center: true, backgroundOpacity: 0}}
      />
      
      <NotesTable data={data ?? []} deleteRecord={deleteRecord} />
    </>
  )
};

export default NotesPage;
