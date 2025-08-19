import type { Meta, StoryObj } from "@storybook/html";
import { Toast } from "./toast";

// Metadata for Storybook
const meta: Meta<typeof Toast> = {
  title: "Elements/Alerts/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: {
        type: "select",
      },
      options: ["information", "alert", "error", "success"],
      description: "The type of the toast.",
    },
    washedBackground: {
      control: {
        type: "boolean",
      },
      description: "Whether the toast has a washed background.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const handleClose = () => alert("Toast closed!");

export const InformationToast: Story = {
  args: {
    header: "Information Toast",
    message:
      "This is an information toast! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in nunc eget ipsum convallis tempor. Praesent facilisis malesuada ante.",
    type: "information",
    washedBackground: true,
    onClose: handleClose,
  },
};

export const SuccessToast: Story = {
  args: {
    header: "Success Toast",
    message:
      "This is a success toast! Nulla facilisi. Sed vel justo nulla. Mauris venenatis orci vel libero bibendum, sed pharetra nunc fermentum. Etiam quis convallis tortor.",
    type: "success",
    washedBackground: false,
    onClose: handleClose,
  },
};

export const ErrorToast: Story = {
  args: {
    header: "Error Toast",
    message:
      "This is an error toast! Aenean imperdiet justo vel velit hendrerit gravida. Curabitur tristique tortor ut nulla pellentesque, id fermentum arcu placerat. Pellentesque sed orci urna.",
    type: "error",
    washedBackground: false,
    onClose: handleClose,
  },
};

export const AlertToast: Story = {
  args: {
    header: "Alert Toast",
    message:
      "This is an alert toast! Cras tincidunt metus ac orci suscipit luctus. Suspendisse vitae libero hendrerit, elementum ligula sit amet, scelerisque ipsum. Nam facilisis vel dui in dapibus.",
    type: "alert",
    washedBackground: true,
    onClose: handleClose,
  },
};
