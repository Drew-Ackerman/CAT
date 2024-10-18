"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Group, LoadingOverlay, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import type { ICat, IUser } from "~/types";
import CatTable from "../components/cat/CatTable";
import AddCatForm from "../components/cat/AddCatForm";
import EditCatForm from "../components/cat/EditCatForm";
import { useState } from "react";
import AssignResearcherForm from "../components/cat/AssignResearcherForm";

/**
 * A table of cat records. 
 */
const CatsPage = () => {
  const [openedAddModal, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [openedAssignResearcherModal, { open: openAssignResearcherModal, close: closeAssignResearcherModal }] =
    useDisclosure(false);
  const [selectedRecord, setSelectedRecord] = useState<ICat>({} as ICat);

  //Pull all items and list them
  const { isPending, data } = useQuery({
    queryKey: ["cats"],
    queryFn: async () => {
      const response = await fetch("/api/cats");
      return (await response.json()) as ICat[];
    },
  });

  const { data: researchers } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      return (await response.json()) as IUser[];
    },
  });

  const createRecord = () => {
    openAddModal();
  };

  const editRecord = (cat: ICat) => {
    setSelectedRecord(cat);
    openEditModal();
  };

  const assignResearcher = (cat: ICat) => {
    setSelectedRecord(cat);
    openAssignResearcherModal();
  };

  const deleteRecord = (record: ICat) => {
    const { id } = record;
    fetch(`/api/cats/${id}`, {
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

  return (
    <>
      <LoadingOverlay visible={isPending} zIndex={1000} 
        loaderProps={{ color: "lime", type: "dots", size:"lg" }}
        overlayProps={{ center: true, backgroundOpacity: 0}}
      />

      <Modal id="addCatModal" opened={openedAddModal} onClose={closeAddModal} centered size="lg" tt="capitalize" title="Add Cat">
        <AddCatForm />
      </Modal>

      <Modal opened={openedEditModal} onClose={closeEditModal} centered size="lg" tt="capitalize" title="Edit Cat">
        <EditCatForm selectedCat={selectedRecord} />
      </Modal>

      <Modal
        opened={openedAssignResearcherModal}
        onClose={closeAssignResearcherModal}
        centered
        size="lg"
        tt="capitalize"
        title="Assign Researcher"
      >
        <AssignResearcherForm selectedCat={selectedRecord} researchers={researchers ?? []} />
      </Modal>

      <Group justify="flex-end">
        <Button onClick={() => createRecord()}>Add</Button>
      </Group>

      <CatTable
        data={data ?? []}
        editRecord={editRecord}
        assignResearcher={assignResearcher}
        deleteRecord={deleteRecord}
      />
    </>
  );
};

export default CatsPage;
