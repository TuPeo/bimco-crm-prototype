import type { StoryObj, Meta } from '@storybook/html';
import { Rating } from './rating';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Elements/Forms/Form Inputs/Rating',
  tags: ['autodocs'],
  component: Rating
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj;

export const Base: Story = {
  args: {
    name: "rating",
    values: [1,2,3,4,5,6,7,8,9,10],
    label: "Rating Label",
    message: "ratingmessage",
    disabled: false
  }
};