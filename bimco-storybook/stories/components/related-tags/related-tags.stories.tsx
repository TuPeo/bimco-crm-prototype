import type { StoryObj, Meta } from '@storybook/html';
import { RelatedTags } from "./related-tags"

const meta: Meta<typeof RelatedTags> = {
  title: "Components/News/Related Tags",
  tags: ['autodocs'],
  component: RelatedTags,
};

export default meta;
type Story = StoryObj<typeof RelatedTags>;

export const DefaultTags: Story = {
  args: {
    tags: [
      { text: "Article tag goes here" },
      { text: "Article tag goes here" },
      { text: "Longer Article tag goes here" },
      { text: "Article tag goes here" },
      { text: "Article tag goes here" },
      { text: "Article tag goes here" },
      { text: "Article tag goes here" },
    ],
  }
};
