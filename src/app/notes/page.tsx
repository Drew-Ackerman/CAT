"use client";

import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { INotes } from "~/types";
import NotesTable from "../components/notes/NotesTable";

const NotesPage = () => {
  const [selectedRecord, setSelectedRecord] = useState(0);

  //Pull all items and list them
  const { isPending, data } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetch("/api/notes");
      return (await response.json()) as INotes[];
    },
  });

  const handleRowSelection = (manualEntryId: number) => {
    if (selectedRecord !== manualEntryId) {
      setSelectedRecord(manualEntryId);
    } else {
      setSelectedRecord(0);
    }
  };

  const deleteSelectedRecord = () => {
    const id = selectedRecord;
    fetch("/api/notes", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
      .then(async () => {
        notifications.show({
          color: "green",
          title: "Delete Successful",
          message: `Threat Removed`,
        });
      })
      .catch(async () => {
        notifications.show({
          color: "red",
          title: "Delete Failed",
          message: "Threat still active",
        });
      });
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  return (
    <NotesTable data={data ?? []} selectedRecord={selectedRecord} recordSelected={handleRowSelection} />
  );
};

export default NotesPage;
