import type { StoryObj, Meta } from '@storybook/html';
import { ProgressCircular } from './progress-circular';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Elements/Forms/Progress/Progress (Circular)',
  tags: ['autodocs'],
  component: ProgressCircular
} satisfies Meta<typeof ProgressCircular>;

export default meta;
type Story = StoryObj;

export const CircularIndeterminate: Story = {
  args: {
    determinate: false,
    percentCompleted: 50,
    circleSizeInPixels: 150
  }
};

export const circular2: Story = {
  args: {
    determinate: true,
    percentCompleted: 20,
    circleSizeInPixels: 150
  }
};

export const circular3: Story = {
  args: {
    determinate: true,
    percentCompleted: 40,
    circleSizeInPixels: 150
  }
};

export const circular4: Story = {
  args: {
    determinate: true,
    percentCompleted: 60,
    circleSizeInPixels: 150
  }
};

export const circular5: Story = {
  args: {
    determinate: true,
    percentCompleted: 80,
    circleSizeInPixels: 150
  }
};

export const circular6: Story = {
  args: {
    determinate: true,
    percentCompleted: 100,
    circleSizeInPixels: 150
  }
};
