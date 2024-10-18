import { Button, Group, Radio, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICat } from "~/types";

const AddCatForm = () => {
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      name: "",
      tag: "",
      color: "",
      sex: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      tag: isNotEmpty("Tag is required"),
      color: isNotEmpty("Color is required"),
      sex: isNotEmpty("Sex is required"),
    },
  });

  const addCat = async (values: typeof form.values) => {
    const resposne = await fetch("/api/cats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    return await resposne.json() as ICat;
  }

  const mutation = useMutation({
    mutationFn: addCat,
    onSuccess: async (addedCat: ICat) => {
      await queryClient.invalidateQueries({ queryKey: ['cats']});
      notifications.show({
        color: "green",
        title: "Save Successful",
        message: `Saved A New Entry`,
      });
    },
    onError: () => {
      notifications.show({
        color: "red",
        title: "Save Failed",
        message: "Could not save the manual entry",
      });
    }
  })

  return (
    <form onSubmit={form.onSubmit((values) => mutation.mutate(values), (errors) => console.log(errors))}>
      <TextInput
        label="Subjects name"
        placeholder="Imminent Destruction"
        withAsterisk
        key={form.key("name")}
        {...form.getInputProps("name")}
        pb="md"
        id="nameTextInput"
      />
      <TextInput
        label="Subjects tag"
        placeholder="CAT-0002"
        withAsterisk
        key={form.key("tag")}
        {...form.getInputProps("tag")}
        pb="md"
        id="tagTextInput"
      />
      <TextInput
        label="Subjects color"
        placeholder="Gruesome Grey"
        withAsterisk
        key={form.key("color")}
        {...form.getInputProps("color")}
        pb="md"
        id="colorTextInput"
      />
      <Radio.Group
        name="sex"
        label="The weapon's sex"
        withAsterisk
        key={form.key("sex")}
        {...form.getInputProps("sex")}
      >
        <Group mt="xs">
          <Radio value="1" label="Male" />
          <Radio value="0" label="Female" />
        </Group>
      </Radio.Group>

      <Button mt="md" type="submit">
        Save
      </Button>
    </form>
  );
};

export default AddCatForm;
