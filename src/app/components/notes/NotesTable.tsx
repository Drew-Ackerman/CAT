import { Anchor, Checkbox, Table } from "@mantine/core";
import type { ICat, INotes, IResearcher } from "~/types";

interface IData extends INotes {
  cat: ICat;
  researcher: IResearcher;
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
          <Anchor href={`/cats/${note.cat.id}`} c="gray" underline="always">
            {note.cat.name}
          </Anchor>
        </Table.Td>
        <Table.Td className="capitalize">
          <Anchor href={`/researchers/${note.researcher.id}`} c="gray" underline="always">
            {note.researcher.name}
          </Anchor>
        </Table.Td>
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
