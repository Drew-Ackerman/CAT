"use client"

import { Card, Group, ActionIcon, Paper, Grid, Title, Flex, ScrollArea, Image, Text } from "@mantine/core";
import { IconMars, IconVenus, IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import NoteCard from "../notes/NoteCard";
import UserInfo from "./UserInfo";
import type { IUser, INotes, ICat } from "~/types";

type User = IUser & {
    notes: Array<INotes & { cat: ICat }>;
    cats: ICat[];
};

export default function ResearcherDashboard({user}: { user: User}){
    const notes = user.notes.map((note) => {
        return <NoteCard key={note.id} data={note}/>;
    })
    .reverse();

  const cats = user.cats.map((cat) => {
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

  return (
    <Paper h={"95dvh"} p="lg" radius="md">
      <Grid>
        <Grid.Col span={12}>
          <UserInfo user={{name: user.name, email: user.email, role: user.role}} />
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