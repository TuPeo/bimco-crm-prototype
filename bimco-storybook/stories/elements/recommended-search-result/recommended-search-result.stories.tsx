import type { StoryObj, Meta } from '@storybook/html';
import { RecommendedSearchResult } from './recommended-search-result';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    text: {
      control: "string"
    }
  },
  title: 'Elements/Search/Recommended Search Result',
  tags: ['autodocs'],
  component: RecommendedSearchResult
} satisfies Meta<typeof RecommendedSearchResult>;

export default meta;
type Story = StoryObj<typeof RecommendedSearchResult>;

export const RecommendedSearchResultExample = {
  args: {
    title: "BIMCO adapts new CII clause for Voyage Charter Parties",
    description: "Here is the first bit of metadata from the page that is being previewed which then",
    tag: "News"
  }
} satisfies Story;