import { Button, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IResearcher } from "~/types";

const EditResearcherForm = (props: { data: IResearcher | null }) => {
  const { data } = props;

  const form = useForm({
    initialValues: {
      name: data?.name || "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    fetch(`/api/researchers/${data?.id}`, {
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
          message: `Researcher Data Saved`,
        });
      })
      .catch(async () => {
        notifications.show({
          color: "red",
          title: "Save Failed",
          message: "Could not save",
        });
      });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, (errors) => console.log(errors))}>
      <TextInput
        label="Researchers name"
        placeholder="Modirator Extroadinare"
        withAsterisk
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

export default EditResearcherForm;
