"use client";

import { useQuery } from "@tanstack/react-query";
import { Button, Group, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import type { IResearcher, IUser } from "~/types";
import AddResearchForm from "../components/researchers/AddResearchForm";
import EditResearcherForm from "../components/researchers/EditResearcherForm";
import ResearchersTable from "../components/researchers/ResearchersTable";

const ResearchersPage = () => {
  const [openedAddModal, { open: openCreateModal, close: closeAddModal }] = useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [selectedRecord, setSelectedRecord] = useState<IResearcher>({} as IResearcher);

  //Pull all items and list them
  const { isPending, data } = useQuery({
    queryKey: ["researchers"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      return (await response.json()) as IUser[];
    },
  });

  const updateRole = (record: IUser, role: string | null) => {
    if (!role) {
      return;
    }

    fetch(`api/users/${record.id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(role),
    })
      .then(async () => {
        notifications.show({
          color: "green",
          title: "Role Updated",
          message: `Role updated`,
        });
      })
      .catch(async () => {
        notifications.show({
          color: "red",
          title: "Role Unchanged",
          message: "Users role remains unchanged.",
        });
      });
  };

  const deleteSelectedRecord = () => {
    fetch(`api/users/${selectedRecord?.id}`, {
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
      <Modal opened={openedAddModal} onClose={closeAddModal} centered size="lg" tt="capitalize" title="Add Researcher">
        <AddResearchForm />
      </Modal>

      <Modal
        opened={openedEditModal}
        onClose={closeEditModal}
        centered
        size="lg"
        tt="capitalize"
        title="Edit Researcher"
      >
        <EditResearcherForm data={selectedRecord} />
      </Modal>

      <Group justify="flex-end">
        <Button onClick={() => openCreateModal()}>Create</Button>
      </Group>

      <ResearchersTable data={data ?? []} updateRole={updateRole} />
    </>
  );
};

export default ResearchersPage;
