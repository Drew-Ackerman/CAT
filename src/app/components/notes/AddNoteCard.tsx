import { Card, Center, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddNoteForm from "./AddNoteForm";

function AddNoteCard({ catId, researcherId }: { catId: number; researcherId: number }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} size="md" tt="capitalize" title={`Add New Note`}>
        <AddNoteForm catId={catId} researcherId={researcherId} />
      </Modal>

      <Card onClick={() => open()} miw={150} maw={150} mah={300} mih={300}>
        <Center miw={125} maw={100} mah={250} mih={250}>
          <Text>Add Note</Text>
        </Center>
      </Card>
    </>
  );
}

export default AddNoteCard;
