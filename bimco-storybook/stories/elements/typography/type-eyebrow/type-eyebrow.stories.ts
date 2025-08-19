import type { StoryObj, Meta } from '@storybook/html';
import type { TypeEyebrowProps } from './type-eyebrow';
import { TypeEyebrow } from './type-eyebrow';

const meta = {
  title: 'Elements/Typography/Type Eyebrow',
  tags: ['autodocs'],
  component: TypeEyebrow,
  argTypes: {
    text: { control: 'text' },
    style: {
      control: 'select',
      options: ['regular','small']
    },
  }
} satisfies Meta<TypeEyebrowProps>;

export default meta;
type Story = StoryObj<TypeEyebrowProps>;

export const Eyebrow: Story = {
};

export const EyebrowSmall: Story = {
  args: {
    style: "small"
  }
};