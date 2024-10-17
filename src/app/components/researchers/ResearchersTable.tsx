import { ActionIcon, Avatar, Group, rem, Select, Table, Text } from "@mantine/core";
import { IconTrash, IconUser, IconZoom } from "@tabler/icons-react";
import Link from "next/link";
import type { IUser } from "~/types";

interface Props {
  data: IUser[];
  updateRole: (user: IUser, role: string | null) => void;
  deleteRecord: (userId: number) => void;
}

function ResearchersTable({ data, updateRole, deleteRecord }: Props) {
  const rows = data?.map((user: IUser) => {
    return (
      <Table.Tr key={user.id} className={""}>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={40} radius={40}>
              <IconUser />
            </Avatar>
            <div>
              <Text fz="sm" fw={500} className="capitalize">
                {user.name}
              </Text>
              <Text fz="xs" c="dimmed">
                {user.email}
              </Text>
            </div>
          </Group>
        </Table.Td>
        <Table.Td>
          <Select
            data={["admin", "user"]}
            defaultValue={user.role}
            variant="unstyled"
            allowDeselect={false}
            onChange={(value, _option) => updateRole(user, value)}
          />
        </Table.Td>

        <Table.Td>
          <ActionIcon variant="subtle" color="gray" component={Link} href={`/researchers/${user.id}`}>
            <IconZoom style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={() => deleteRecord(user.id)}>
            <IconTrash stroke={1.5} />
          </ActionIcon>
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
