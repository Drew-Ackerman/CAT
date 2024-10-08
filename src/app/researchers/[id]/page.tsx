"use client";

import { Badge, Button, Card, Group, Image, Modal, Paper, rem, Stack, Tabs, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings, IconNote } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import AddNoteForm from "~/app/components/notes/AddNoteForm";
import { ICat, INotes, IResearcher } from "~/types";

const iconStyle = { width: rem(12), height: rem(12) };

export default function ResearcherPage() {
  const { id } = useParams();
  const [openedAddNote, { open: openAddNote, close: closeAddNote }] = useDisclosure(false);

  //Pull all items and list them
  const { isPending, data: researcher } = useQuery({
    queryKey: ["researcher"],
    queryFn: async () => {
      const response = await fetch(`/api/researchers/${id}`, { method: "GET" });
      return (await response.json()) as IResearcher & { notes: INotes[]; cats: ICat[] };
    },
  });

  if (isPending) {
    return <p>loading</p>;
  }

  console.log(researcher);

  const latestNote = researcher?.notes.at(0);

  const notes = researcher?.notes?.map((n) => {
    const time = new Date(n.timestamp).toLocaleString();

    return (
      <Group grow justify="space-between">
        <Text className={"ellipses"}>{n.text}</Text>
        <Text>{time}</Text>
      </Group>
    );
  });

  return (
    <Paper h={"95dvh"} p="lg" radius="md">
      <Modal
        opened={openedAddNote}
        onClose={closeAddNote}
        centered
        size="lg"
        tt="capitalize"
        title="Add An Observation"
      >
        <AddNoteForm />
      </Modal>

      <Group grow>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src="/photos/moons.jpg" h={200} alt="Cat photo" />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{researcher?.name}</Text>
            <Badge color="pink">On Sale</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            {latestNote ? latestNote.text : "Nothing to note here..."}
          </Text>
        </Card>

        <Paper p="md" radius="md" withBorder>
          <Tabs defaultValue="notes">
            <Tabs.List>
              <Tabs.Tab value="notes" leftSection={<IconNote style={iconStyle} />}>
                Notes
              </Tabs.Tab>
              <Tabs.Tab value="traits" leftSection={<IconSettings style={iconStyle} />}>
                Traits
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="notes">
              <Stack align="stretch" justify="flex-start" gap="md" mt="xs">
                {notes}
              </Stack>
              <Group justify="flex-end" grow>
                <Button maw={100} mt="md" onClick={() => openAddNote()}>
                  Add Note
                </Button>
              </Group>
            </Tabs.Panel>

            <Tabs.Panel value="traits">Settings tab content</Tabs.Panel>
          </Tabs>
        </Paper>
      </Group>
    </Paper>
  );
}
