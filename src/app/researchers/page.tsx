"use client"

import { useQuery } from "@tanstack/react-query";
import { Button, Group, Modal, ScrollArea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IResearcher } from "~/types";
import ResearcherTable from "../components/researchers/ResearchersTable";
import AddResearchForm from "../components/researchers/AddResearchForm";

const ResearchersPage = () => {

  const [openedAddModal, { open: openCreateModal, close: closeAddModal }] = useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [selectedRecord, setSelectedRecord] = useState(0);

  //Pull all items and list them
  const { isPending, data } = useQuery({
    queryKey: ["researchers"],
    queryFn: async () => {
      const response = await fetch("/api/researchers");
      return (await response.json()) as IResearcher[];
    },
  });

  const handleRowSelection = (manualEntryId: number) => {
    if (selectedRecord !== manualEntryId) {
      setSelectedRecord(manualEntryId);
    } else {
      setSelectedRecord(0);
    }
  };

  const editManualEntry = () => {
    // openEditModal();
  };

  const deleteSelectedRecord = () => {
    const id = selectedRecord;
    fetch("/api/researchers", {
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

  const editRecord = () => {
    openCreateModal();
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <Modal
        opened={openedAddModal}
        onClose={closeAddModal}
        centered
        size="lg"
        tt="capitalize"
        title="Create A Manual Entry"
      >
        <AddResearchForm/>
      </Modal>
      
      {/* <Modal
        opened={openedEditModal}
        onClose={closeEditModal}
        centered
        size="lg"
        tt="capitalize"
        title="Create A Manual Entry"
      >
        <EditManualForm
          entry={manual?.entries.find((entry) => {
            return entry.id === selection;
          })}
        />
      </Modal> */ }

      <ScrollArea className="h-[80vh]">
        <ResearcherTable data={data ?? []} selectedRecord={selectedRecord} recordSelected={handleRowSelection}/>
      </ScrollArea>

      <Group justify="flex-end">
        <Button onClick={() => editRecord()}>Create</Button>
        {selectedRecord && <Button onClick={() => editManualEntry()}>Edit</Button>}
        {selectedRecord && (
          <Button color="red" onClick={() => deleteSelectedRecord()}>
            Delete
          </Button>
        )}
      </Group>
    </>
  )
}

export default ResearchersPage;