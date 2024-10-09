"use client";

import {
  Badge,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconMars, IconVenus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ICat, INotes, IResearcher } from "~/types";


type Response = IResearcher & {
  notes: Array<INotes & { cat: ICat }>;
  cats: ICat[];
};

export default function ResearcherPage() {
  const { id } = useParams();

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

  const notes = researcher?.notes?.map((note) => {
    const time = new Date(note.timestamp).toLocaleString();

    return (
      <Flex m="sm" justify="space-between">
        <Text>{note.cat.name}</Text>
        <Text className={"ellipses"}>{note.text}</Text>
        <Text>{time}</Text>
      </Flex>
    );
  });

  const cats = researcher?.cats.map((cat) => {
    return (
      <Card key={cat.id} shadow="sm" padding="lg" radius="md" withBorder>
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
          <Title order={2}>Assigned Inmates</Title>
          <Flex mt={"md"} mih={100} gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
            {cats}
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Title order={2}>Recent Notes</Title>
          <ScrollArea>
            <Stack align="stretch" justify="flex-start" gap="md" mt="xs">
              {notes}
            </Stack>
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
