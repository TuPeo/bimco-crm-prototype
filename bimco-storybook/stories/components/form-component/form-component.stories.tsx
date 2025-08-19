import { Meta, StoryObj } from "@storybook/html";
import { FormComponent, FormComponentProps } from "./form-component";
import { FormStep } from "../form-step/form-step";
import { FormStepBaseChildren, Base as FormStepBase } from "../form-step/form-step.stories";

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Forms/Form Component',
  tags: ['autodocs'],
  component: FormComponent
} satisfies Meta<FormComponentProps>;

export default meta;
type Story = StoryObj<FormComponentProps>;

export const Base: Story = {
  render: (args) => FormComponent({...args, children: [
    FormStep({ ...FormStepBase.args, children: FormStepBaseChildren})
  ]}),
  args: {
    title: "Form Example",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    theme: "white"
  }
};
  