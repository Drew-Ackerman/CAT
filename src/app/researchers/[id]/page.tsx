"use client";

import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  rem,
  ScrollArea,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings, IconNote, IconMars, IconVenus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import AddNoteForm from "~/app/components/notes/AddNoteForm";
import { ICat, INotes, IResearcher } from "~/types";

const iconStyle = { width: rem(12), height: rem(12) };

type Response = IResearcher & {
  notes: Array<INotes & { cat: ICat }>;
  cats: ICat[];
};

export default function ResearcherPage() {
  const { id } = useParams();
  const [openedAddNote, { open: openAddNote, close: closeAddNote }] = useDisclosure(false);

  //Pull all items and list them
  const { isPending, data: researcher } = useQuery({
    queryKey: ["researcher"],
    queryFn: async () => {
      const response = await fetch(`/api/researchers/${id}`, { method: "GET" });
      const data = (await response.json()) as Response;
      return data;
    },
  });

  if (isPending) {
    return <p>loading</p>;
  }

  console.log(researcher);

  const latestNote = researcher?.notes.at(0);

  const notes = researcher?.notes?.map((note) => {
    const time = new Date(note.timestamp).toLocaleString();

    return (
      <Group m="sm" grow justify="space-between">
        <Text>{note.cat.name}</Text>
        <Text className={"ellipses"}>{note.text}</Text>
        <Text>{time}</Text>
      </Group>
    );
  });

  const cats = researcher?.cats.map((cat) => {
    return (
      <Card key={cat.id} m="md" shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src="/photos/moons.jpg" h={100} alt="Cat photo" />
        </Card.Section>
        <Group mt="md" mb="xs">
          <Text fw={500}>{cat.name}</Text>
          {cat.sex ? <IconMars /> : <IconVenus />}
        </Group>
        <Group>
          <Badge color="pink">On Sale</Badge>
        </Group>
      </Card>
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

      <Grid>
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image src="/photos/drew.jpg" h={300} alt="Researcher photo" />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Title order={2}>{researcher?.name}</Title>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={8}>
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
              <ScrollArea>
                <Stack align="stretch" justify="flex-start" gap="md" mt="xs">
                  {notes}
                </Stack>
              </ScrollArea>
              <Group justify="flex-end" grow>
                <Button maw={100} mt="md" onClick={() => openAddNote()}>
                  Add Note
                </Button>
              </Group>
            </Tabs.Panel>

            <Tabs.Panel value="traits">Settings tab content</Tabs.Panel>
          </Tabs>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex mt={"md"} mih={100} gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
            {cats}
          </Flex>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
