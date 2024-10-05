import { Checkbox, Table } from "@mantine/core";
import type { IResearcher } from "~/types";
 
interface Props {
    data: IResearcher[],
    selectedRecord: number,
    recordSelected: (id:number) => void,
}

function ResearcherTable({data, selectedRecord, recordSelected}: Props) {

    const rows = data?.map((researcher: IResearcher) => {
    return (
        <Table.Tr key={researcher.id} className={""}>
        <Table.Td>
            <Checkbox checked={selectedRecord === researcher.id} onChange={() => recordSelected(researcher.id)} />
        </Table.Td>
        <Table.Td className="capitalize">{researcher.name}</Table.Td>
        </Table.Tr>
    );
    });

    return (
        <Table miw={800} verticalSpacing="sm">
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Select</Table.Th>
                    <Table.Th>Name</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )
}

export default ResearcherTable