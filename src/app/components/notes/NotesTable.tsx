import { ActionIcon, Anchor, Avatar, Group, Table } from "@mantine/core";
import { IconCat, IconTrash, IconUser } from "@tabler/icons-react";
import type { ICat, INotes, IUser } from "~/types";

interface IData extends INotes {
  cat: ICat;
  researcher: IUser;
}

interface Props {
  data: IData[];
  deleteRecord: (id: number) => void;
}

function NotesTable({ data, deleteRecord }: Props) {
  const rows = data?.map((note: IData) => {
    return (
      <Table.Tr key={note.id} className={""}>
        <Table.Td className="capitalize">
          <Group gap="sm">
            <Avatar size={40} radius={40}>
              <IconCat />
            </Avatar>
            <Anchor href={`/cats/${note.cat.id}`} c="gray" underline="always">
              {note.cat.name}
            </Anchor>
          </Group>
        </Table.Td>

        <Table.Td className="capitalize">
          <Group gap="sm">
            <Avatar size={40} radius={40}>
              <IconUser />
            </Avatar>
            <Anchor href={`/researchers/${note.researcher.id}`} c="gray" underline="always">
              {note.researcher.name}
            </Anchor>
          </Group>
        </Table.Td>
        <Table.Td>{note.radioactivity}</Table.Td>
        <Table.Td>{note.temperament}</Table.Td>
        <Table.Td className="truncate capitalize">{note.text}</Table.Td>
        <Table.Td className="capitalize">{new Date(note.timestamp).toLocaleString()}</Table.Td>
        <Table.Td>
          <ActionIcon variant="subtle" color="gray" onClick={() => deleteRecord(note.id)}>
            <IconTrash stroke={1.5} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table miw={800} verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Cat</Table.Th>
          <Table.Th>Researcher</Table.Th>
          <Table.Th>Radioactivity</Table.Th>
          <Table.Th>Temperament</Table.Th>
          <Table.Th>Text</Table.Th>
          <Table.Th>Time</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default NotesTable;
