import type { StoryObj, Meta } from '@storybook/html';
import { Table, TableArgs, TableBaseArgs, TableMaximumSizeArgs, TableLinksArgs } from './table';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Elements/Global/Table',
  tags: ['autodocs'],
  component: Table
} satisfies Meta<TableArgs>;

export default meta;
type Story = StoryObj<TableArgs>;

export const Base: Story = {
  args: TableBaseArgs
}

export const MaximumSize: Story = {
  args: TableMaximumSizeArgs
}

export const Links: Story = {
  args: TableLinksArgs
}

