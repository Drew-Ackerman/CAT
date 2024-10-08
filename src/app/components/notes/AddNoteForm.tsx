import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

const AddNoteForm = () => {
  const form = useForm({
    initialValues: {
      text: "",
    },
    validate: {},
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
        label="Note Text"
        placeholder="Cat observation text"
        key={form.key("name")}
        {...form.getInputProps("name")}
        pb="md"
      />

      <Button mt="md" type="submit">
        Save
      </Button>
    </form>
  );
};

export default AddNoteForm;
