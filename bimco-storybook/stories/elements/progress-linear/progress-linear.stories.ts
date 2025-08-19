import type { StoryObj, Meta } from '@storybook/html';
import { ProgressLinear } from './progress-linear';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Elements/Forms/Progress/Progress (Linear)',
  tags: ['autodocs'],
  component: ProgressLinear
} satisfies Meta<typeof ProgressLinear>;

export default meta;
type Story = StoryObj;

export const LinearIndeterminate: Story = {
  args: {
    determinate: false,
    percentCompleted: 50
  }
};

export const linear2: Story = {
  args: {
    determinate: true,
    percentCompleted: 20
  }
};

export const linear3: Story = {
  args: {
    determinate: true,
    percentCompleted: 40
  }
};

export const linear4: Story = {
  args: {
    determinate: true,
    percentCompleted: 60
  }
};

export const linear5: Story = {
  args: {
    determinate: true,
    percentCompleted: 80
  }
};

export const linear6: Story = {
  args: {
    determinate: true,
    percentCompleted: 100
  }
};