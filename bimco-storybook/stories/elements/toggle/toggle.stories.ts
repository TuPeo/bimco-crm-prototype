import type { StoryObj, Meta } from '@storybook/html';
import { Toggle } from './toggle';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Elements/Forms/Form Inputs/Toggle',
  tags: ['autodocs'],
  component: Toggle,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'small']
    }
  }
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj;

export const Base: Story = {
  args: {
    id: "toggleid",
    name: "togglename",
    variant: "small",
    label: "Toggle Label",
    disabled: false
  }
};