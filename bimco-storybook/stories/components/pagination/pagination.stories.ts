import type { StoryObj, Meta } from '@storybook/html';
import { Pagination, PaginationProps } from './pagination';

const meta = {
  title: 'Components/Search/Pagination',
  tags: ['autodocs'],
  component: Pagination,
  argTypes: { }
} satisfies Meta<PaginationProps>;

export default meta;
type Story = StoryObj<PaginationProps>;

export const Five: Story = {
  args: { 
    selectedPage: 1,
    maxShown: 4,
    pageCount: 5
  }
};

export const Seven: Story = {
  args: { 
    selectedPage: 1,
    maxShown: 4,
    pageCount: 7
  }
};

export const Thirteen: Story = {
  args: { 
    selectedPage: 9,
    maxShown: 7,
    pageCount: 13
  }
};

export const ThirtyTwo: Story = {
  args: { 
    selectedPage: 28,
    maxShown: 7,
    pageCount: 32
  }
};
