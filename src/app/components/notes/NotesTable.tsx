import { Anchor, Checkbox, Table } from "@mantine/core";
import Link from "next/link";
import type { ICat, INotes, IResearcher } from "~/types";

interface IData extends INotes {
  cat: ICat;
  researchers: IResearcher;
}

interface Props {
  data: IData[];
  selectedRecord: number;
  recordSelected: (id: number) => void;
}

function NotesTable({ data, selectedRecord, recordSelected }: Props) {
  const rows = data?.map((note: IData) => {
    return (
      <Table.Tr key={note.id} className={""}>
        <Table.Td>
          <Checkbox checked={selectedRecord === note.id} onChange={() => recordSelected(note.id)} />
        </Table.Td>

        <Table.Td className="capitalize">
          <Anchor c="gray" underline="always">
            <Link href={`/cats/${note.cat.id}`}>{note.cat.name}</Link>
          </Anchor>
        </Table.Td>
        <Table.Td className="capitalize">{note.researchers.name}</Table.Td>
        <Table.Td className="truncate capitalize">{note.text}</Table.Td>
        <Table.Td className="capitalize">{note.timestamp}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table striped stripedColor="violet" miw={800} verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Select</Table.Th>
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
