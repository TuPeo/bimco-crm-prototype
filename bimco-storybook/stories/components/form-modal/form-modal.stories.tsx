import { Meta, StoryObj } from "@storybook/html";
import { FormModal, FormModalProps } from "./form-modal";
import { FormStep } from "../form-step/form-step";
import { Base as FormStepBase, FormStepBaseChildren } from "../form-step/form-step.stories";

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Forms/Form Modal',
  tags: ['autodocs'],
  component: FormModal
} satisfies Meta<FormModalProps>;

export default meta;
type Story = StoryObj<FormModalProps>;

export const Base: Story = {
  render: (args) => FormModal({...args, children: [
    FormStep({ ...FormStepBase.args, children: FormStepBaseChildren})
  ]}),
  args: {
    title: "Form Example",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    theme: "white"
  }
};
  