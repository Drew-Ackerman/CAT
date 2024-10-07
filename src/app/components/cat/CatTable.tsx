import { Checkbox, Table } from "@mantine/core";
import { ICat } from "~/types";
 
interface Props {
    data: ICat[],
    selectedRecord: number,
    recordSelected: (id:number) => void,
}

function CatTable({data, selectedRecord, recordSelected}: Props) {

    const rows = data?.map((cat: ICat) => {
        return (
            <Table.Tr key={cat.id} className={""}>
                <Table.Td>
                    <Checkbox checked={selectedRecord === cat.id} onChange={() => recordSelected(cat.id)} />
                </Table.Td>
                <Table.Td className="capitalize">{cat.name}</Table.Td>
                <Table.Td className="capitalize">{cat.tag}</Table.Td>
                <Table.Td className="capitalize">{cat.color}</Table.Td>
                <Table.Td className="capitalize">{cat.sex ? "Male" : "Female"}</Table.Td>
            </Table.Tr>
        );
    });

    return (
        <Table miw={800} verticalSpacing="sm">
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Select</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Tag</Table.Th>
                    <Table.Th>Color</Table.Th>
                    <Table.Th>Sex</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )
}

export default CatTable