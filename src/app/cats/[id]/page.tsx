"use client";

import { Flex, Grid, Paper, ScrollArea, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CatInfoCard from "~/app/components/cat/CatInfoCard";
import AddNoteCard from "~/app/components/notes/AddNoteCard";
import NoteCard from "~/app/components/notes/NoteCard";
import { ICat, INotes } from "~/types";

export default function CatPage() {
  const { id } = useParams();

  //Pull all items and list them
  const { isPending, data: cat } = useQuery({
    queryKey: ["cat"],
    queryFn: async () => {
      const response = await fetch(`/api/cats/${id}`, { method: "GET" });
      return (await response.json()) as ICat & { notes: INotes[] };
    },
  });

  if (!cat) {
    return <p>loading</p>;
  }

  const notes = Array.of(<AddNoteCard catId={cat.id} researcherId={cat?.researcherId} />);
  cat?.notes?.forEach((note) => {
    notes.push(<NoteCard key={note.id} data={note} />);
  });

  return (
    <Paper h={"95dvh"} p="lg" radius="md">
      <Grid>
        <Grid.Col span={12}>
          <CatInfoCard cat={cat} />
        </Grid.Col>

        <Grid.Col span={12}>
          <Title order={2}>Notes</Title>
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
