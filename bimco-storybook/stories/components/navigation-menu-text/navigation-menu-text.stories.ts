import type { StoryObj, Meta } from '@storybook/html';
import { NavigationMenuTextBox } from './navigation-menu-text';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Navigation/Text Box',
  tags: ['autodocs'],
  component: NavigationMenuTextBox
} satisfies Meta<typeof NavigationMenuTextBox>;

export default meta;
type Story = StoryObj<typeof NavigationMenuTextBox>;

export const TextBoxExample = {
  args: {
    text: '<h3 class="headline-5">We make it our business to help our members with theirs</h3><p>Facilitating trade is at the very heart of our business, and since 1905, we’ve helped our members keep world trade moving.</p>'
  }
} satisfies Story;