"use client";

import { useQuery } from "@tanstack/react-query";
import { Button, Group, Modal, ScrollArea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IResearcher } from "~/types";
import AddResearchForm from "../components/researchers/AddResearchForm";
import EditResearcherForm from "../components/researchers/EditResearcherForm";
import ResearchersTable from "../components/researchers/ResearchersTable";

const ResearchersPage = () => {
  const [openedAddModal, { open: openCreateModal, close: closeAddModal }] = useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [selectedRecord, setSelectedRecord] = useState<IResearcher | null>(null);

  //Pull all items and list them
  const { isPending, data } = useQuery({
    queryKey: ["researchers"],
    queryFn: async () => {
      const response = await fetch("/api/researchers");
      return (await response.json()) as IResearcher[];
    },
  });

  const handleRowSelection = (record: IResearcher) => {
    if (selectedRecord?.id !== record.id) {
      setSelectedRecord(record);
    } else {
      setSelectedRecord(null); //Uncheck if someone clicked the same record.
    }
  };

  const deleteSelectedRecord = () => {
    fetch(`api/researchers/${selectedRecord?.id}`, {
      method: "DELETE",
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
    <>
      <Modal
        opened={openedAddModal}
        onClose={closeAddModal}
        centered
        size="lg"
        tt="capitalize"
        title="Create A Manual Entry"
      >
        <AddResearchForm />
      </Modal>

      <Modal
        opened={openedEditModal}
        onClose={closeEditModal}
        centered
        size="lg"
        tt="capitalize"
        title="Create A Manual Entry"
      >
        <EditResearcherForm data={selectedRecord} />
      </Modal>

      <ScrollArea className="h-[80vh]">
        <ResearchersTable data={data ?? []} selectedRecord={selectedRecord} recordSelected={handleRowSelection} />
      </ScrollArea>

      <Group justify="flex-end">
        {!selectedRecord && <Button onClick={() => openCreateModal()}>Create</Button>}
        {selectedRecord && <Button onClick={() => openEditModal()}>Edit</Button>}
        {selectedRecord && (
          <Button color="red" onClick={() => deleteSelectedRecord()}>
            Delete
          </Button>
        )}
      </Group>
    </>
  );
};

export default ResearchersPage;
