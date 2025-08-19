import * as React from 'jsx-dom';
import type { StoryObj, Meta } from '@storybook/html';
import { SearchResultsList, SearchResultsListProps } from './search-results-list';
import { SearchResultCard } from '../search-result-card/search-result-card';
import { SearchResultWithImage } from '../search-result-card/search-result-card.stories';

const meta: Meta<SearchResultsListProps> = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Search/Search Results List',
  tags: ['autodocs'],
  component: SearchResultsList
};

export default meta;
type Story = StoryObj<SearchResultsListProps>;

const searchResultCards = [
  <SearchResultCard {...SearchResultWithImage.args} />,
  <SearchResultCard {...SearchResultWithImage.args} />,
  <SearchResultCard {...SearchResultWithImage.args} />,
  <SearchResultCard {...SearchResultWithImage.args} />,
  <SearchResultCard {...SearchResultWithImage.args} />,
];

export const SearchResults: Story = {
  render: (args) => SearchResultsList({...args, children: searchResultCards}),
  args: {
    noResultsMessage: null
  }
}
