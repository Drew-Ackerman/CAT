import { ActionIcon, Avatar, Group, Menu, rem, Table, Text } from "@mantine/core";
import { IconCat, IconDots, IconPencil, IconTrash, IconUser, IconZoom } from "@tabler/icons-react";
import Link from "next/link";
import { ICat } from "~/types";

interface Props {
  data: ICat[];
  editRecord: (record: ICat) => void;
  assignResearcher: (record: ICat) => void;
  deleteRecord: (record: ICat) => void;
}

function CatTable({ data, editRecord, assignResearcher, deleteRecord }: Props) {
  const rows = data?.map((cat: ICat) => {
    return (
      <Table.Tr key={cat.id}>
        <Table.Td className="capitalize">
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
        <Table.Td className="capitalize">{cat.tag}</Table.Td>
        <Table.Td className="capitalize">{cat.color}</Table.Td>
        <Table.Td className="capitalize">{cat.sex ? "Male" : "Female"}</Table.Td>

        <Table.Td>
          <ActionIcon variant="subtle" color="gray" onClick={() => editRecord(cat)}>
            <IconPencil stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray" component={Link} href={`/cats/${cat.id}`}>
            <IconZoom stroke={1.5} />
          </ActionIcon>

          <Menu transitionProps={{ transition: "pop" }} withArrow position="bottom-end" withinPortal>
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => assignResearcher(cat)} leftSection={<IconUser stroke={1.5} />}>
                Assign Researcher
              </Menu.Item>
              <Menu.Item onClick={() => deleteRecord(cat)} leftSection={<IconTrash />} color="red">
                Remove
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
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
  );
}

export default CatTable;
