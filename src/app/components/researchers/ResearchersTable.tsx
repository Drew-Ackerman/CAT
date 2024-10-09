import { Avatar, Group, Select, Table, Text } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import type { IUser } from "~/types";

interface Props {
  data: IUser[];
  selectedRecord: IUser | null;
  recordSelected: (record: IUser) => void;
}

function ResearchersTable({ data, recordSelected }: Props) {
  const rows = data?.map((researcher: IUser) => {
    return (
      <Table.Tr key={researcher.id} className={""}>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={40} radius={40}><IconUser/></Avatar>
            <div>
              <Text fz="sm" fw={500} className="capitalize">
                {researcher.name}
              </Text>
              <Text fz="xs" c="dimmed">
                {researcher.email}
              </Text>
            </div>
          </Group>
        </Table.Td>
        <Table.Td>
          <Select 
            data={["admin", "user"]}
            defaultValue={researcher.role}
            variant="unstyled"
            allowDeselect={false}
          />
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={600}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Employee</Table.Th>
            <Table.Th>Role</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default ResearchersTable;
