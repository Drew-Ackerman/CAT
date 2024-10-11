import { ActionIcon, Card, Divider, Group, Modal, Stack, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoodAngry, IconMoodAnnoyed, IconMoodSmile, IconMoodSmileBeam, IconRadioactive } from "@tabler/icons-react";
import { INotes } from "~/types";

function NoteCard({data} : {data: INotes}){

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
        <Modal
            opened={opened}
            onClose={close}
            size="md"
            tt="capitalize"
            title={`${new Date(data.timestamp).toLocaleString()}`}
        >
            <Text>{data.text}</Text>
        </Modal>

            <Card onClick={() => open()} maw={150} mah={300} mih={300}>
                <Stack>
                    <Group justify="space-evenly">
                        {radioactivity(data.radioactivity)}
                        {temperament(data.temperament)}
                    </Group>
                    <Divider/>
                    <Text mih={150} className="ellipses">
                        {data.text}
                    </Text>
                    {new Date(data.timestamp).toLocaleString()}
                </Stack>
            </Card>
        </>
    )
}

export default NoteCard;

function temperament(temperament: number){
    let icon;
    let color;

    if(temperament <= 3){
        icon = <IconMoodAngry/>
        color = "red";
    }
    else if(temperament > 3 && temperament <= 5 ){
        icon = <IconMoodAnnoyed/>
        color = "orange"
    }
    else if(temperament > 5 && temperament <= 8){
        icon = <IconMoodSmile/>
        color = "yellow"
    }
    else{
        icon = <IconMoodSmileBeam/>
        color = "green"
    }

    return <Tooltip label={`Temperament: ${temperament}`}>
        <ActionIcon color={color} size={34}>
            {icon}
        </ActionIcon>
    </Tooltip>       
}

function radioactivity(radioactivity: number){
    let color;

    switch(radioactivity){
        case 5:
            color = "lime.8"
            break;
        case 4:
            color = "lime.6"
            break;
        case 3:
            color = "lime.4"
            break;
        case 2:
            color = "lime.2"
            break;
        case 1:
            color = "lime.0"
            break;
    }

    return <Tooltip label={`Radioactivity: ${radioactivity}`}>
        <ActionIcon color={color} size={34}>
            <IconRadioactive/>
        </ActionIcon>
    </Tooltip>       
}