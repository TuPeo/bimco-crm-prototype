import type { StoryObj, Meta } from '@storybook/html';
import type { TypeHeadingProps } from './type-heading';
import { TypeHeading } from './type-heading';

const meta = {
  title: 'Elements/Typography/Type Headings',
  tags: ['autodocs'],
  component: TypeHeading,
  argTypes: {
    tag: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5']
    },
    text: { control: 'text' }
  }
} satisfies Meta<TypeHeadingProps>;

export default meta;
type Story = StoryObj<TypeHeadingProps>;

export const Headline1: Story = {
  args: {
    tag: 'h1',
  }
};

export const Headline2: Story = {
  args: {
    tag: 'h2',
  }
};

export const Headline3: Story = {
  args: {
    tag: 'h3',
  }
};

export const Headline4: Story = {
  args: {
    tag: 'h4',
  }
};

export const Headline5: Story = {
  args: {
    tag: 'h5',
  }
};
