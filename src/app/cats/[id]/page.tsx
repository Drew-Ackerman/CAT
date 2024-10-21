"use client";

import { Flex, Grid, LoadingOverlay, Paper, ScrollArea, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import CatInfoCard from "~/app/components/cat/CatInfoCard";
import Unauthorized from "~/app/components/errors/Unauthorized";
import AddNoteCard from "~/app/components/notes/AddNoteCard";
import NoteCard from "~/app/components/notes/NoteCard";
import type { ICat, INotes } from "~/types";

interface Data extends ICat {
  notes: INotes[],
}

export default function CatPage() {
  const { id: catId } = useParams();
  const session = useSession();

  const { data: assignedCats} = useQuery({
    queryKey: [`user`, session.data?.user.id, `cats`],
    queryFn: async () => {
      const response = await fetch(`/api/users/${session.data?.user.id}/cats`, { method: "GET" });
      return (await response.json()) as Array<number>;
    },
    enabled: session.data?.user.id !== undefined,
  })

  //Pull all items and list them
  const { isPending, data: cat } = useQuery({
    queryKey: [`cat`, catId],
    queryFn: async () => {
      const response = await fetch(`/api/cats/${catId}`, { method: "GET" });
      return (await response.json()) as Data;
    },
    enabled: catId !== undefined && !Array.isArray(catId) && assignedCats !== undefined && assignedCats?.includes(Number.parseInt(catId)),
  });

  if(catId == undefined || Array.isArray(catId) || (assignedCats !== undefined && !assignedCats?.includes(Number.parseInt(catId))) ){
    return <Unauthorized/>
  }

  if(isPending || !cat){
    return <LoadingOverlay visible={true} zIndex={1000} 
      loaderProps={{ color: "lime", type: "dots", size:"lg" }}
      overlayProps={{ center: true, backgroundOpacity: 0}}
    />
  }

  const notes = Array.of(<AddNoteCard key={0} catId={cat.id} researcherId={cat.researcherId} />);
  cat.notes.forEach((note) => {
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
