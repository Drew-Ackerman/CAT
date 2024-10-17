"use client";

import { useQuery } from "@tanstack/react-query";
import { Button, Group, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import type { IUser } from "~/types";
import AddResearchForm from "../components/researchers/AddResearchForm";
import ResearchersTable from "../components/researchers/ResearchersTable";

const ResearchersPage = () => {
  const [openedAddModal, { open: openCreateModal, close: closeAddModal }] = useDisclosure(false);

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

  const deleteRecord = (userId: number) => {
    fetch(`api/users/${userId}`, {
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

      <Group justify="flex-end">
        <Button onClick={() => openCreateModal()}>Create</Button>
      </Group>

      <ResearchersTable data={data ?? []} updateRole={updateRole} deleteRecord={deleteRecord} />
    </>
  );
};

export default ResearchersPage;
