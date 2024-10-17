"use client";

import { Card, Flex, Grid, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import type { ICat, INotes, IUser } from "~/types";

export default function HomePage() {
  
  const session = useSession();

  const { isPending, data } = useQuery({
    queryKey: ["researchers"],
    queryFn: async () => {
      const response = await fetch(`/api/users/${session.data.user.id}`);
      return (await response.json()) as IUser[] & { notes: INotes[], cats: ICat[]}
    },
    enabled: session.status == "authenticated",
  });

  console.log("data", data);

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


  if(isPending){
    return <p>Loading...</p>
  }

  return (
    <Grid>
      <Grid.Col span={12}>
        <Flex>{cats}</Flex>
      </Grid.Col>

      <Grid.Col span={12}>
        <Flex>{notes}</Flex>
      </Grid.Col>
    </Grid>
  );
}
