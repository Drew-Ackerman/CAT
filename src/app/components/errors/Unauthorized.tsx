import { Button, Container, Group, rem, Text, Title } from "@mantine/core"
import Link from "next/link";
import { useRouter } from "next/navigation";

const Unauthorized = () => {

    const router = useRouter();

    return (
        <Container pt="md">
            <Title ta="center" fw={900}>Client Error</Title>
            <Text c="dimmed" size="lg" ta="center" maw={rem(540)} m="auto" mt="lg" mb="xl">
                Page you are trying to open does not exist. You may have mistyped the address, or the
                page has been moved to another URL. If you think this is an error contact support.
            </Text>
            <Group justify="center">
                <Button size="md" onClick={() => router.back()}>Go Back</Button>
                <Button size="md" component={Link} href={"/"}>Go Home</Button>
            </Group>
      </Container>
    )
}

export default Unauthorized;