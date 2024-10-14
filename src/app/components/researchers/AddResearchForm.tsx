import { Button, Select, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

const AddResearchForm = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      role: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      email: isNotEmpty("Email is required"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    fetch("/api/users", {
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
          message: `Researcher Added`,
        });
      })
      .catch(async () => {
        notifications.show({
          color: "red",
          title: "Save Failed",
          message: "Could not add a new researcher",
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

      <TextInput
        label="Researchers Email"
        placeholder="watcher@cat.com"
        withAsterisk
        key={form.key("email")}
        {...form.getInputProps("email")}
        pb="md"
      />

      <Select
        label="Researchers role"
        withAsterisk
        data={["admin", "user"]}
        defaultValue={"user"}
        allowDeselect={false}
        key={form.key("role")}
        {...form.getInputProps("role")}
        pb="md"
      />

      <Button mt="md" type="submit">
        Save
      </Button>
    </form>
  );
};

export default AddResearchForm;
