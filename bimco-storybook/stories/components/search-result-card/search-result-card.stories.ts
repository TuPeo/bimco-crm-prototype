import type { StoryObj, Meta } from '@storybook/html';
import { SearchResultCard, SearchResultCardProps } from './search-result-card';

const meta: Meta = {
  title: 'Components/Cards/Search Result Card',
  tags: ['autodocs'],
  component: SearchResultCard
};

export default meta;
type Story = StoryObj<SearchResultCardProps>;

export const SearchResultWithImage = {
  args: {
    title: 'Lorem ipsum sip dolor sit amet consectetur',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur commodo finibus. Vestibulum porttitor pharetra quam quis pulvinar. Proin tincidunt, elit eget pellentesque fringilla, tortor est venenatis leo',
    url: '#',
    image: 'https://loremflickr.com/320/320',
    imageAlt: 'Picture',
    tag: 'Category',
    tagUrl: '#',
    metadata: {
      items: [
        { value: 'Event', type: 'articletype' },
        { value: '02 Aug - 05 Aug 24', type: 'date' },
        { value: 'City, Country', type: 'location', iconStyle: 'solid', iconName: 'location-dot'}
      ],
      contextClass: 'search-result-card__metadata'
    }
  }
} satisfies Story;

export const SearchResultNoImage = {
  args: {
    title: 'Lorem ipsum sip dolor sit amet consectetur',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur commodo finibus. Vestibulum porttitor pharetra quam quis pulvinar. Proin tincidunt, elit eget pellentesque fringilla, tortor est venenatis leo',
    url: '#',
    tag: 'Category',
    tagUrl: '#'
  }
} satisfies Story;
