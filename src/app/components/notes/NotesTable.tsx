import { Anchor, Avatar, Group, Table } from "@mantine/core";
import { IconCat, IconUser } from "@tabler/icons-react";
import type { ICat, INotes, IResearcher } from "~/types";

interface IData extends INotes {
  cat: ICat;
  researcher: IResearcher;
}

interface Props {
  data: IData[];
  recordSelected: (id: number) => void;
}

function NotesTable({ data, recordSelected }: Props) {
  const rows = data?.map((note: IData) => {
    return (
      <Table.Tr key={note.id} className={""}>
        <Table.Td className="capitalize">
          <Group gap="sm">
            <Avatar size={40} radius={40}><IconCat/></Avatar>
            <Anchor href={`/cats/${note.cat.id}`} c="gray" underline="always">
              {note.cat.name}
            </Anchor>
          </Group>
        </Table.Td>

        <Table.Td className="capitalize">
          <Group gap="sm">
            <Avatar size={40} radius={40}><IconUser/></Avatar>
            <Anchor href={`/researchers/${note.researcher.id}`} c="gray" underline="always">
              {note.researcher.name}
            </Anchor>
          </Group>

        </Table.Td>
        <Table.Td className="truncate capitalize">{note.text}</Table.Td>
        <Table.Td className="capitalize">{new Date(note.timestamp).toLocaleString()}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table miw={800} verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Cat</Table.Th>
          <Table.Th>Researcher</Table.Th>
          <Table.Th>Text</Table.Th>
          <Table.Th>Time</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default NotesTable;
