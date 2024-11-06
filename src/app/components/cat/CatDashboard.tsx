"use client"

import { Paper, Grid, Title, ScrollArea, Flex, Card, Center, Text } from "@mantine/core";
import CatInfoCard from "./CatInfoCard";
import AddNoteCard from "../notes/AddNoteCard";
import NoteCard from "../notes/NoteCard";
import type { ICat, INotes, IUser } from "~/types";

interface Data extends ICat {
    notes: Array<INotes> | null,
    researcher: IUser | null,
}

export default function CatDashboard({cat}: {cat: Data}){

    const notes = new Array<JSX.Element>();

    if(!cat.researcherId){
        notes.push(researcherCard());
    }
    else {
        notes.push(<AddNoteCard key={0} catId={cat.id} researcherId={cat.researcherId} />);
    }

    cat.notes?.forEach((note) => {
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
    )
}

function researcherCard(){
    return (
        <Card key="-1" miw={150} maw={150} mah={300} mih={300}>
            <Center miw={125} maw={100} mah={250} mih={250}>
                <Text>Admins Can Assign a researcher to add notes</Text>
            </Center>
        </Card>
    )
}