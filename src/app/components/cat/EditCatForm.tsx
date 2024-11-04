import { Button, Group, Radio, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICat } from "~/types";

const EditCatForm = (props: { selectedCat: ICat }) => {
  const { selectedCat } = props;
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      name: selectedCat.name,
      tag: selectedCat.tag,
      color: selectedCat.color,
      sex: selectedCat.sex ? "1" : "0",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      tag: isNotEmpty("Tag is required"),
      color: isNotEmpty("Color is required"),
      sex: isNotEmpty("Sex is required"),
    },
  });

  const patchCat = async (values: typeof form.values) => {
    const response = await fetch(`/api/cats/${selectedCat.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    return await response.json() as ICat;
  }

  const editMutation = useMutation({
    mutationFn: patchCat,
    onSuccess: async (editedCat: ICat) => {
      await queryClient.setQueryData(["cats"], (prevCats: ICat[]) =>{
        return prevCats.map(cat => cat.id === editedCat.id ? editedCat : cat);
      });
      notifications.show({
        color: "green",
        title: "Edit Successful",
        message: `Edit cat ${selectedCat.tag}`,
      });
    },
    onError: () => {
      notifications.show({
        color: "red",
        title: "Save Failed",
        message: "Could not edit",
      });
    }
  })

  return (
    <form onSubmit={form.onSubmit((values) => editMutation.mutate(values), (errors) => console.log(errors))}>
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
        label="Subjects sex"
        withAsterisk
        key={form.key("sex")}
        {...form.getInputProps("sex")}
      >
        <Group mt="xs">
          <Radio test-id="male" value="1" label="Male" />
          <Radio test-id="female" value="0" label="Female" />
        </Group>
      </Radio.Group>

      <Button id="submitButton" mt="md" type="submit">
        Save
      </Button>
    </form>
  );
};

export default EditCatForm;
