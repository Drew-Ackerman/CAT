"use client";

import { Card, Flex, Grid, Group, Image, Paper, ScrollArea, Text, Title } from "@mantine/core";
import { IconMars, IconVenus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import NoteCard from "~/app/components/notes/NoteCard";
import UserInfo from "~/app/components/researchers/UserInfo";
import { ICat, INotes, IUser } from "~/types";

type Response = IUser & {
  notes: Array<INotes & { cat: ICat }>;
  cats: ICat[];
};

export default function ResearcherPage() {
  const { id } = useParams();

  //Pull all items and list them
  const { isPending, data } = useQuery({
    queryKey: ["researcher"],
    queryFn: async () => {
      const response = await fetch(`/api/users/${id}`, { method: "GET" });
      const data = (await response.json()) as Response;
      return data;
    },
  });

  if (!data) {
    return <p>loading</p>;
  }

  const notes = data.notes
    .map((note) => {
      return <NoteCard key={note.id} data={note} />;
    })
    .reverse();

  const cats = data?.cats.map((cat) => {
    return (
      <Card key={cat.id} shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src="/photos/moons.jpg" h={100} alt="Cat photo" />
        </Card.Section>
        <Group mt="md">
          <Text fw={500}>{cat.name}</Text>
          {cat.sex ? <IconMars /> : <IconVenus />}
        </Group>
      </Card>
    );
  });

  const userData = {
    name: data?.name ?? "",
    email: data?.email ?? "",
    role: data?.role ?? "user",
  };

  return (
    <Paper h={"95dvh"} p="lg" radius="md">
      <Grid>
        <Grid.Col span={12}>
          <UserInfo user={userData} />
        </Grid.Col>

        <Grid.Col span={12}>
          <Title order={2}>Assigned Inmates</Title>
          <Flex mt={"md"} mih={100} gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
            {cats}
          </Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Title order={2}>Recent Notes</Title>
          <ScrollArea>
            <Flex align="stretch" justify="flex-start" gap="md" mt="xs">
              {notes}
            </Flex>
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
