import type { StoryObj, Meta } from '@storybook/html';
import type { NumberedListProps } from './numbered-list';
import { NumberedList } from './numbered-list';

const meta = {
  title: 'Elements/Typography/Numbered List',
  tags: ['autodocs'],
  component: NumberedList,
  argTypes: {
    bulletPoints: { control: "text" }
  }
} satisfies Meta<NumberedListProps>;

export default meta;
type Story = StoryObj<NumberedListProps>;

export const NumberedPoints: Story = {
};