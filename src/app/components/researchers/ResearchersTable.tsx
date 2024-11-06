"use client"

import { ActionIcon, Avatar, Button, Group, Modal, rem, Select, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconTrash, IconUser, IconZoom } from "@tabler/icons-react";
import Link from "next/link";
import type { IUser } from "~/types";
import AddResearchForm from "./AddResearchForm";


function ResearchersTable({ users }: { users: Array<IUser> }) {
  const [openedAddModal, { open: openCreateModal, close: closeAddModal }] = useDisclosure(false);

  const updateRole = (record: IUser, role: string | null) => {
    if (!role) {
      notifications.show({
        color: "red",
        title: "Role Unchanged",
        message: "Invalid Role Selected",
      });
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

  const rows = users?.map((user: IUser) => {
    return (
      <Table.Tr key={user.id} className={""}>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={40} radius={40}>
              <IconUser />
            </Avatar>
            <div>
              <Text fz="sm" fw={500} className="capitalize">
                {user.name}
              </Text>
              <Text fz="xs" c="dimmed">
                {user.email}
              </Text>
            </div>
          </Group>
        </Table.Td>
        <Table.Td>
          <Select
            data={["admin", "user"]}
            defaultValue={user.role}
            variant="unstyled"
            allowDeselect={false}
            onChange={(value, _option) => updateRole(user, value)}
          />
        </Table.Td>

        <Table.Td>
          <ActionIcon variant="subtle" color="gray" component={Link} href={`/researchers/${user.id}`}>
            <IconZoom style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={() => deleteRecord(user.id)}>
            <IconTrash stroke={1.5} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <Modal opened={openedAddModal} onClose={closeAddModal} centered size="lg" tt="capitalize" title="Add Researcher">
        <AddResearchForm />
      </Modal>

      <Group justify="flex-end">
        <Button onClick={() => openCreateModal()}>Create</Button>
      </Group>

      <Table.ScrollContainer minWidth={600}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Employee</Table.Th>
              <Table.Th>Role</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}

export default ResearchersTable;
