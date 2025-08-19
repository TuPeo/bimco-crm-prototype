import type { StoryObj, Meta } from '@storybook/html';
import { SearchMenu, SearchMenuBaseChildren } from './search-menu';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Navigation/Search Menu',
  tags: ['autodocs'],
  component: SearchMenu,
  argTypes: {
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const BimcoSearchMenu = {
  render: () => SearchMenu({ children: SearchMenuBaseChildren })
} satisfies Story;