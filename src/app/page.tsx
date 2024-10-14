"use client";

import { Card, Flex, Grid, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { ICat, IResearcher } from "~/types";

export default function HomePage() {
  const { isPending: researcherDataIsPending, data: researcherData } = useQuery({
    queryKey: ["researchers"],
    queryFn: async () => {
      const response = await fetch("/api/researchers");
      return (await response.json()) as IResearcher[];
    },
  });

  const { isPending: catDataIsPending, data: catData } = useQuery({
    queryKey: ["cats"],
    queryFn: async () => {
      const response = await fetch("/api/cats");
      return (await response.json()) as ICat[];
    },
  });

  const researchers = researcherData?.map((r) => {
    return (
      <Card key={r.id}>
        <Text>{r.name}</Text>
      </Card>
    );
  });

  const cats = catData?.map((c) => {
    return (
      <Card key={c.id}>
        <Text>{c.name}</Text>
      </Card>
    );
  });

  return (
    <Grid>
      <Grid.Col span={6}>
        <Flex>{researcherDataIsPending ? <p>Loading Researchers</p> : researchers}</Flex>
      </Grid.Col>
      <Grid.Col span={6}>
        <Flex>{catDataIsPending ? <p>Loading Cats</p> : cats}</Flex>
      </Grid.Col>
    </Grid>
  );
}
