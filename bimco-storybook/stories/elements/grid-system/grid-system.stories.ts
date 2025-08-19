import type { StoryObj, Meta } from '@storybook/html';
import { GridSystem } from './grid-system';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Elements/Global/Grid System',
  tags: ['autodocs'],
  component: GridSystem
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Grid: Story = {
};