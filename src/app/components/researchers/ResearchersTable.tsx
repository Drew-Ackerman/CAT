import { Anchor, Checkbox, Table } from "@mantine/core";
import type { IResearcher } from "~/types";

interface Props {
  data: IResearcher[];
  selectedRecord: IResearcher | null;
  recordSelected: (record: IResearcher) => void;
}

function ResearchersTable({ data, selectedRecord, recordSelected }: Props) {
  const rows = data?.map((researcher: IResearcher) => {
    return (
      <Table.Tr key={researcher.id} className={""}>
        <Table.Td>
          <Checkbox checked={selectedRecord?.id === researcher.id} onChange={() => recordSelected(researcher)} />
        </Table.Td>
        <Table.Td className="capitalize">
          <Anchor href={`/researchers/${researcher.id}`}>{researcher.name}</Anchor>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table striped stripedColor="violet" miw={800} verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Select</Table.Th>
          <Table.Th>Name</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default ResearchersTable;
