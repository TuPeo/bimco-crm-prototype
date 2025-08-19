import type { StoryObj, Meta } from '@storybook/html';
import type { TypeBodyProps } from './type-body';
import { TypeBody } from './type-body';

const meta = {
  title: 'Elements/Typography/Type Body',
  tags: ['autodocs'],
  component: TypeBody,
  argTypes: {
    text: { control: 'text' },
    style: {
      control: 'select',
      options: ['regular', 'large', 'small', 'tight']
    },
  }
} satisfies Meta<TypeBodyProps>;

export default meta;
type Story = StoryObj<TypeBodyProps>;

export const BodyRegular: Story = {
};

export const BodyLarge: Story = {
  args: {
    style: "large"
  }
};

export const BodySmall: Story = {
  args: {
    style: "small"
  }
};

export const BodyTight: Story = {
  args: {
    style: "tight"
  }
};