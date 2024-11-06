"use client"

import { ActionIcon, Avatar, Button, Group, Menu, Modal, Table, Text } from "@mantine/core";
import { IconCat, IconDots, IconPencil, IconTrash, IconUser, IconZoom } from "@tabler/icons-react";
import Link from "next/link";
import type { ICat, IUser } from "~/types";
import AddCatForm from "./AddCatForm";
import AssignResearcherForm from "./AssignResearcherForm";
import EditCatForm from "./EditCatForm";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

interface Props {
  cats: Array<ICat>;
  users: Array<IUser>;
}

function CatTable({ cats, users }: Props) {
  const [openedAddModal, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [openedAssignResearcherModal, { open: openAssignResearcherModal, close: closeAssignResearcherModal }] =
    useDisclosure(false);
  const [selectedRecord, setSelectedRecord] = useState<ICat>({} as ICat);
  
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

  const rows = cats?.map((cat: ICat) => {
    return (
      <Table.Tr test-id="catRecord" key={cat.id}>
        <Table.Td test-id="catName" className="capitalize">
          <Group gap="sm">
            <Avatar size={40} radius={40}>
              <IconCat />
            </Avatar>
            <div>
              <Text fz="sm" fw={500} className="capitalize">
                {cat.name}
              </Text>
            </div>
          </Group>
        </Table.Td>
        <Table.Td test-id="catTag" className="capitalize">{cat.tag}</Table.Td>
        <Table.Td test-id="catColor" className="capitalize">{cat.color}</Table.Td>
        <Table.Td test-id="catSex" className="capitalize">{cat.sex ? "Male" : "Female"}</Table.Td>

        <Table.Td>
          <ActionIcon test-id="editRecordIcon" variant="subtle" color="gray" onClick={() => editRecord(cat)}>
            <IconPencil stroke={1.5} />
          </ActionIcon>
          <ActionIcon test-id="profileLink" variant="subtle" color="gray" component={Link} href={`/cats/${cat.id}`}>
            <IconZoom stroke={1.5} />
          </ActionIcon>

          <Menu test-id="actionMenu" transitionProps={{ transition: "pop" }} withArrow position="bottom-end" withinPortal>
            <Menu.Target >
              <ActionIcon variant="subtle" color="gray">
                <IconDots stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item test-id="assignResearcherIcon" onClick={() => assignResearcher(cat)} leftSection={<IconUser stroke={1.5} />}>
                Assign Researcher
              </Menu.Item>
              <Menu.Item test-id="deleteRecordIcon" onClick={() => deleteRecord(cat)} leftSection={<IconTrash />} color="red">
                Remove
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
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
        <AssignResearcherForm selectedCat={selectedRecord} researchers={users ?? []} />
      </Modal>

      <Group justify="flex-end">
        <Button onClick={() => createRecord()}>Add</Button>
      </Group>
    
      <Table.ScrollContainer minWidth={600}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Tag</Table.Th>
              <Table.Th>Color</Table.Th>
              <Table.Th>Sex</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}

export default CatTable;
