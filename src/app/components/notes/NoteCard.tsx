import { Card, Divider, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { INotes  } from "~/types";
import RadioactivityIcon from "./RadioactivityIcon";
import TemperamentIcon from "./TemperamentIcon";

function NoteCard({ data }: { data: INotes }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        test-id="viewNoteModal"
        opened={opened}
        onClose={close}
        size="md"
        tt="capitalize"
        title={`${new Date(data.timestamp).toLocaleString()}`}
      >
        <Text>{data.text}</Text>
      </Modal>

      <Card test-id={"noteCard"} onClick={() => open()} maw={150} mah={300} mih={300}>
        <Stack>
          <Group justify="space-evenly">
            <RadioactivityIcon radioactivity={data.radioactivity}/>
            <TemperamentIcon temperament={data.temperament}/>
          </Group>
          <Divider />
          <Text mih={150} className="ellipses">
            {data.text}
          </Text>
          {new Date(data.timestamp).toLocaleString()}
        </Stack>
      </Card>
    </>
  );
}

export default NoteCard;