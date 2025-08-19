import type { Meta, StoryObj } from "@storybook/html";
import { FormAlert } from "./form-alert";

// Metadata for Storybook
const meta: Meta<typeof FormAlert> = {
  title: "Elements/Alerts/Form Alert",
  component: FormAlert,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FormAlert>;

// Information FormAlert
export const InformationFormAlert: Story = {
  args: {
    message: "This is an information alert!",
    type: "information",
  },
};

// Error FormAlert
export const ErrorFormAlert: Story = {
  args: {
    message: "This is an error alert!",
    type: "error",
  },
};

// Alert FormAlert
export const AlertFormAlert: Story = {
  args: {
    message: "This is an alert!",
    type: "alert",
  },
};
