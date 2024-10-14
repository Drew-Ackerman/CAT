import { Avatar, Group, Text } from "@mantine/core";
import { ICat } from "~/types";

function CatInfoCard({ cat }: { cat: ICat }) {
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar src="/photos/moons.jpg" size={94} radius="md" />
        <div>
          <Text fz="lg" fw={500} className="uppercase">
            {cat.name}
          </Text>

          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            Cat - {cat.sex ? "Male" : "Female"}
          </Text>
        </div>
      </Group>
    </div>
  );
}

export default CatInfoCard;
