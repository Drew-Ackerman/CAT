import { Button, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import type { ICat, IUser } from "~/types";

const AssignResearcherForm = (props: { selectedCat: ICat; researchers: IUser[] }) => {
  const { selectedCat, researchers } = props;

  const form = useForm({
    initialValues: {
      researcherId: null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    fetch(`/api/cats/${selectedCat.id}/researcher`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if(response.status == 200){
          notifications.show({
            color: "green",
            title: "Save Successful",
            message: `Assigned researcher to cat`,
          });
        }
        else {
          notifications.show({
            color: "red",
            title: "Save Failed",
            message: "Could not assign researcher to cat",
          });
        }
      })
      .catch(async () => {
        notifications.show({
          color: "red",
          title: "Save Failed",
          message: "Server Issue",
        });
      });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, (errors) => console.log(errors))}>
      <Select
        test-id="researcherSelect"
        label="Assign a researcher"
        data={researchers.map((r) => {
          return { value: r.id.toString(), label: r.name };
        })}
        key={form.key("researcherId")}
        {...form.getInputProps("researcherId")}
      />

      <Button id="saveButton" mt="md" type="submit">
        Save
      </Button>
    </form>
  );
};

export default AssignResearcherForm;
