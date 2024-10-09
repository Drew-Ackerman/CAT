"use client";

import { Badge, Button, Card, Grid, Group, Image, Modal, Paper, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import AddNoteForm from "~/app/components/notes/AddNoteForm";
import { ICat, INotes } from "~/types";

export default function CatPage() {
  const { id } = useParams();
  const [openedAddNote, { open: openAddNote, close: closeAddNote }] = useDisclosure(false);

  //Pull all items and list them
  const { isPending, data: cat } = useQuery({
    queryKey: ["cat"],
    queryFn: async () => {
      const response = await fetch(`/api/cats/${id}`, { method: "GET" });
      return (await response.json()) as ICat & { notes: INotes[] };
    },
  });

  if (isPending) {
    return <p>loading</p>;
  }

  const notes = cat?.notes?.map((n) => {
    const time = new Date(n.timestamp).toLocaleString();
    return (
      <Group key={n.id} grow justify="space-between">
        <Text className={"ellipses"}>{n.text}</Text>
        <Text>{time}</Text>
      </Group>
    );
  });

  const catProfile = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src="/photos/moons.jpg" h={200} alt="Cat photo" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{cat?.name}</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {cat?.notes.at(0) ? cat?.notes.at(0)?.text : "Nothing to note here..."}
      </Text>
    </Card>
  );

  const traits = (
    <Paper>
      <Title>Traits</Title>
    </Paper>
  );

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
        <AddNoteForm catId={cat?.id} researcherId={cat?.researcherId} />
      </Modal>

      <Grid>
        <Grid.Col span={4}>{catProfile}</Grid.Col>
        <Grid.Col span={8}>{traits}</Grid.Col>

        <Grid.Col span={12}>
          <ScrollArea>
            <Stack align="stretch" justify="flex-start" gap="md" mt="xs">
              {notes}
            </Stack>
          </ScrollArea>
        </Grid.Col>

        <Grid.Col span={12}>
          <Group justify="flex-end">
            <Button maw={100} mt="md" onClick={() => openAddNote()}>
              Add Note
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
