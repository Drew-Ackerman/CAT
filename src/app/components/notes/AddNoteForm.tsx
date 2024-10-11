import { Button, Rating, Slider, Text, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconRadioactive } from "@tabler/icons-react";

const AddNoteForm = ({ catId, researcherId }: { catId: number; researcherId: number }) => {
  const form = useForm({
    initialValues: {
      text: "",
      temperament: 0,
      radioactivity: 0, 
      catId: catId,
      researcherId: researcherId,
    },
    validate: {
      text: isNotEmpty("Note text is needed"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(async () => {
        notifications.show({
          color: "green",
          title: "Save Successful",
          message: `Note Saved`,
        });
      })
      .catch(async () => {
        notifications.show({
          color: "red",
          title: "Save Failed",
          message: "Could not save the note",
        });
      });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, (errors) => console.log(errors))}>
      <TextInput
        label="Note"
        placeholder="Its going super critical!"
        key={form.key("text")}
        {...form.getInputProps("text")}
        pb="md"
      />

      <Text>Subjects Radioactivity</Text>
      <Rating
        emptySymbol={<IconRadioactive/>}
        fullSymbol={<IconRadioactive color="lime"/>}
        key={form.key("radioactivity")}
        {...form.getInputProps("radioactivity")}
        pb={"md"}
      />

      <Text>Subjects Temperament</Text>
      <Slider
        key={form.key("temperament")}
        {...form.getInputProps("temperament")}
        max={10}
        pb={"md"}
      />

      <Button mt="md" type="submit">
        Save
      </Button>
    </form>
  );
};

export default AddNoteForm;
