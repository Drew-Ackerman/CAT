"use client";

import { useQuery } from "@tanstack/react-query";
import { Button, Group, Modal, ScrollArea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import type { ICat, IResearcher } from "~/types";
import CatTable from "../components/cat/CatTable";
import AddCatForm from "../components/cat/AddCatForm";
import EditCatForm from "../components/cat/EditCatForm";

const CatsPage = () => {
  const [openedAddModal, { open: openCreateModal, close: closeAddModal }] = useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [selectedRecord, setSelectedRecord] = useState(0);

  //Pull all items and list them
  const { isPending, data } = useQuery({
    queryKey: ["cats"],
    queryFn: async () => {
      const response = await fetch("/api/cats");
      return (await response.json()) as ICat[];
    },
  });

  const { data: researcherData } = useQuery({
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

  const editRecord = () => {
    openEditModal();
  };

  const createRecord = () => {
    openCreateModal();
  };

  const deleteSelectedRecord = () => {
    const id = selectedRecord;
    fetch("/api/manual", {
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
    <>
      <Modal
        opened={openedAddModal}
        onClose={closeAddModal}
        centered
        size="lg"
        tt="capitalize"
        title="Create A Manual Entry"
      >
        <AddCatForm />
      </Modal>

      <Modal
        opened={openedEditModal}
        onClose={closeEditModal}
        centered
        size="lg"
        tt="capitalize"
        title="Create A Manual Entry"
      >
        <EditCatForm
          selectedCat={data?.find((cat) => {
            return cat.id === selectedRecord;
          })}
          researchers={researcherData ?? []}
        />
      </Modal>

      <ScrollArea className="h-[80vh]">
        <CatTable data={data ?? []} selectedRecord={selectedRecord} recordSelected={handleRowSelection} />
      </ScrollArea>

      <Group justify="flex-end">
        {!selectedRecord && <Button onClick={() => createRecord()}>Create</Button>}

        {selectedRecord && <Button onClick={() => editRecord()}>Edit</Button>}
        {selectedRecord && (
          <Button color="red" onClick={() => deleteSelectedRecord()}>
            Delete
          </Button>
        )}
      </Group>
    </>
  );
};

export default CatsPage;
