"use client";

import { Card, Flex, Grid, LoadingOverlay, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import type { ICat, INotes, IUser } from "~/types";

export default function HomePage() {
  
  const session = useSession();

  const { isPending, data } = useQuery({
    queryKey: [`user ${session.data?.user.id}`],
    queryFn: async () => {
      const response = await fetch(`/api/users/${session.data?.user.id}`);
      return (await response.json()) as IUser[] & { notes: INotes[], cats: ICat[]}
    },
    enabled: session.status == "authenticated",
  });

  const notes = data?.notes?.map((note) => {
    return (
      <Card key={note.id}>
        <Text>{note.text}</Text>
      </Card>
    );
  });

  const cats = data?.cats?.map((cat) => {
    return (
      <Card key={cat.id}>
        <Text>{cat.name}</Text>
      </Card>
    );
  });

  return (
    <>
      <LoadingOverlay visible={isPending} zIndex={1000} 
        loaderProps={{ color: "lime", type: "dots", size:"lg" }}
        overlayProps={{ center: true, backgroundOpacity: 0}}
      />
    
      <Grid>
        <Grid.Col span={12}>
          <Flex>{cats}</Flex>
        </Grid.Col>

        <Grid.Col span={12}>
          <Flex>{notes}</Flex>
        </Grid.Col>
      </Grid>
    </>


  );
}
