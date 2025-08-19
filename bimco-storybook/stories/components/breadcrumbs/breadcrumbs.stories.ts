import type { StoryObj, Meta } from '@storybook/html';
import { Breadcrumbs, BreadcrumbsProps, crumbs } from './breadcrumbs';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Elements/Global/Breadcrumbs',
  tags: ['autodocs'],
  component: Breadcrumbs
} satisfies Meta<BreadcrumbsProps>;

export default meta;
type Story = StoryObj<BreadcrumbsProps>;

export const LongList: Story = {
  args: {
    crumbs: crumbs,
  }
};

export const ShortList: Story = {
  args: {
    crumbs: [crumbs[0], crumbs[4]],
  }
};
