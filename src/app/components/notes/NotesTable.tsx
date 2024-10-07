import { Checkbox, Table } from "@mantine/core";
import type { INotes } from "~/types";
 
interface Props {
    data: INotes[],
    selectedRecord: number,
    recordSelected: (id:number) => void,
}

function NotesTable({data, selectedRecord, recordSelected}: Props) {

    const rows = data?.map((note: INotes) => {
    return (
        <Table.Tr key={note.id} className={""}>
            <Table.Td>
                <Checkbox checked={selectedRecord === note.id} onChange={() => recordSelected(note.id)} />
            </Table.Td>
            <Table.Td className="capitalize">{note.catId}</Table.Td>
            <Table.Td className="capitalize">{note.researcherId}</Table.Td>
            <Table.Td className="capitalize truncate">{note.text}</Table.Td>
            <Table.Td className="capitalize">{note.timestamp}</Table.Td>
        </Table.Tr>
    );
    });

    return (
        <Table miw={800} verticalSpacing="sm">
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
    )
}

export default NotesTable