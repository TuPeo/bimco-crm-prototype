import type { StoryObj, Meta } from '@storybook/html';
import { ScheduleCard, ScheduleCardProps } from './schedule-card';

const meta = {
  title: 'Elements/Navigation/Schedule Card',
  tags: ['autodocs'],
  component: ScheduleCard,
  argTypes: {
    title: {
      control: "text"
    },
    description: {
      control: "text"
    },
    month: {
      control: "text"
    },
    day: {
      control: "number"
    }
  }
} satisfies Meta<ScheduleCardProps>;

export default meta;
type Story = StoryObj<ScheduleCardProps>;

export const ScheduleCardExample = {
  args: {
    title: "Event name",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    month: "July",
    day: 16,
  }
} satisfies Story;