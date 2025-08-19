import type { StoryObj, Meta } from '@storybook/html';
import { CategoryTag } from './category-tag';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    text: "Tag"
  },
  argTypes: {
    text: {
      control: "string"
    }
  },
  title: 'Elements/Search/Category Tag',
  tags: ['autodocs'],
  component: CategoryTag
} satisfies Meta<typeof CategoryTag>;

export default meta;
type Story = StoryObj<typeof CategoryTag>;

export const SearchResultExample: Story = {};