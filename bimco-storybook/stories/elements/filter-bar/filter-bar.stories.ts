import type { StoryObj, Meta } from '@storybook/html';
import { FilterBar } from './filter-bar';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Elements/Search/Filter Bar',
  tags: ['autodocs'],
  component: FilterBar
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj;

export const Base: Story = {
  args: {
    values: ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5", "Tag6", "Tag7", "Tag8", "Tag9", "Tag1", "Tag2", "Tag3", "Tag4", "Tag5", "Tag6", "Tag7", "Tag8", "Tag9"]
  }
};
