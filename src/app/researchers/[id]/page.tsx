"use client";

import { Card, Flex, Grid, Group, Image, LoadingOverlay, Paper, ScrollArea, Text, Title } from "@mantine/core";
import { IconMars, IconVenus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import NoteCard from "~/app/components/notes/NoteCard";
import UserInfo from "~/app/components/researchers/UserInfo";
import type { ICat, INotes, IUser } from "~/types";

type User = IUser & {
  notes: (INotes & { cat: ICat })[];
  cats: ICat[];
};

export default function ResearcherPage() {
  const { id } = useParams();

  //Pull all items and list them
  const { data: user } = useQuery({
    queryKey: [`researcher${id}`],
    queryFn: async () => {

      if(!id || Array.isArray(id)){
        return;
      }

      const response = await fetch(`/api/users/${id}`, { method: "GET" });
      const data = (await response.json()) as User;
      return data;
    },
  });

  const notes = user?.notes
    .map((note) => {
      return <NoteCard key={note.id} data={note}/>;
    })
    .reverse();

  const cats = user?.cats.map((cat) => {
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
    name: user?.name ?? "",
    email: user?.email ?? "",
    role: user?.role ?? "user",
  };

  return (
    <Paper h={"95dvh"} p="lg" radius="md">
      <LoadingOverlay visible={!user} zIndex={1000} 
        loaderProps={{ color: "lime", type: "dots", size:"lg" }}
        overlayProps={{ center: true, backgroundOpacity: 0}}
      />

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
