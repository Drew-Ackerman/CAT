"use client";

import { ActionIcon, Card, Flex, Grid, Group, Image, LoadingOverlay, Paper, ScrollArea, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import type { ICat, INotes, IUser } from "~/types";
import UserInfo from "./components/researchers/UserInfo";
import { IconMars, IconSearch, IconVenus } from "@tabler/icons-react";
import NoteCard from "./components/notes/NoteCard";
import Link from "next/link";

type User = IUser & {
  notes: (INotes & { cat: ICat })[];
  cats: ICat[];
};

export default function HomePage() {
  
  const session = useSession();
  const userId = session.data?.user.id;

  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${session.data?.user.id}`);
      return (await response.json()) as User;
    },
    enabled: session.status == "authenticated",
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
          <ActionIcon variant="subtle" color="grey.5" component={Link} href={`/cats/${cat.id}`}>
            <IconSearch/>
          </ActionIcon>
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
