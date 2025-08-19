import type { StoryObj, Meta } from '@storybook/html';
import { NavigationLink, NavigationLinkProps } from './navigation-link';

const meta = {
  title: 'Elements/Navigation/Navigation Link',
  tags: ['autodocs'],
  component: NavigationLink
} satisfies Meta<NavigationLinkProps>;

export default meta;
type Story = StoryObj<NavigationLinkProps>;

export const LandingPageLink = {
  args: {
    label: 'Landing page link',
    url: '/'
  }
} satisfies Story;

export const SubPageLink = {
  args: {
    label: 'Sub page link',
    url: '/',
    type: "sub-page"
  }
} satisfies Story;