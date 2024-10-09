"use client";

import { useQuery } from "@tanstack/react-query";
import { Button, Group, Modal, ScrollArea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { INotes } from "~/types";
import AddNoteForm from "../components/notes/AddNoteForm";
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

  console.log(data);

  return (
    <>
      <ScrollArea className="h-[80vh]">
        <NotesTable data={data ?? []} selectedRecord={selectedRecord} recordSelected={handleRowSelection} />
      </ScrollArea>

      <Group justify="flex-end">
        {selectedRecord && (
          <Button color="red" onClick={() => deleteSelectedRecord()}>
            Delete
          </Button>
        )}
      </Group>
    </>
  );
};

export default NotesPage;
