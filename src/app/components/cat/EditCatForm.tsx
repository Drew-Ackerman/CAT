import { Button, Combobox, Group, MultiSelect, Radio, Select, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { ICat, IResearcher } from "~/types";

const EditCatForm = (props: { selectedCat: ICat; researchers: IResearcher[] }) => {
  const { selectedCat, researchers } = props;

  const form = useForm({
    initialValues: {
      name: selectedCat.name,
      tag: selectedCat.tag,
      color: selectedCat.color,
      sex: selectedCat.sex,
      researcherId: null,
    },
    validate: {
      name: isNotEmpty("Name is required"),
      tag: isNotEmpty("Tag is required"),
      color: isNotEmpty("Color is required"),
      sex: isNotEmpty("Sex is required"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    fetch(`/api/cats/${selectedCat.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(async () => {
        notifications.show({
          color: "green",
          title: "Edit Successful",
          message: `Edit cat ${selectedCat.tag}`,
        });
      })
      .catch(async () => {
        notifications.show({
          color: "red",
          title: "Save Failed",
          message: "Could not edit",
        });
      });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, (errors) => console.log(errors))}>
      <TextInput
        label="Subjects name"
        placeholder="Imminent Destruction"
        withAsterisk
        key={form.key("name")}
        {...form.getInputProps("name")}
        pb="md"
      />
      <TextInput
        label="Subjects tag"
        placeholder="CAT-0002"
        withAsterisk
        key={form.key("tag")}
        {...form.getInputProps("tag")}
        pb="md"
      />
      <TextInput
        label="Subjects color"
        placeholder="Gruesome Grey"
        withAsterisk
        key={form.key("color")}
        {...form.getInputProps("color")}
        pb="md"
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

      <Select
        label="Assign a researcher"
        data={researchers.map((r) => {
          return { value: r.id.toString(), label: r.name };
        })}
        key={form.key("researcherId")}
        {...form.getInputProps("researcherId")}
      />

      <Button mt="md" type="submit">
        Save
      </Button>
    </form>
  );
};

export default EditCatForm;
