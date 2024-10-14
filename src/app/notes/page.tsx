"use client";

import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import type { ICat, INotes, IResearcher } from "~/types";
import NotesTable from "../components/notes/NotesTable";

interface IData extends INotes {
  cat: ICat;
  researcher: IResearcher;
}

const NotesPage = () => {

  //Pull all items and list them
  const { isPending, data } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetch("/api/notes");
      return (await response.json()) as IData[];
    },
  });

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

  if (isPending) {
    return <span>Loading...</span>;
  }

  return <NotesTable data={data ?? []} deleteRecord={deleteRecord} />;
};

export default NotesPage;
