import type { StoryObj, Meta } from '@storybook/html';
import { SearchBar } from './search-bar';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Elements/Search/Search Bar',
  tags: ['autodocs'],
  component: SearchBar
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj;

export const Base: Story = {
  args: {
    placeholder: 'Enter your keyword in here...',
    inputLabel: 'Submit'
  }
};
