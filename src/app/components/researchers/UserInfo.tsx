import { Avatar, Group, Text } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

function UserInfo({ user }: { user: { role: string; name: string; email: string } }) {
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar src="/photos/drew.jpg" size={94} radius="md" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {`Researcher - ${user.role}`}
          </Text>

          <Text fz="lg" fw={500} className="uppercase">
            {user.name}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" />
            <Text fz="xs" c="dimmed">
              {user.email}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}

export default UserInfo;
