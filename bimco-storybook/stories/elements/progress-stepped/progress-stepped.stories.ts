import type { StoryObj, Meta } from '@storybook/html';
import { ProgressStepped } from './progress-stepped';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Elements/Forms/Progress/Progress (Stepped)',
  tags: ['autodocs'],
  component: ProgressStepped
} satisfies Meta<typeof ProgressStepped>;

export default meta;
type Story = StoryObj;

export const stepped0: Story = {
  args: {
    stepsCompleted: 0,
    steps: 7
  }
};

export const stepped1: Story = {
  args: {
    stepsCompleted: 1,
    steps: 7
  }
};

export const stepped2: Story = {
  args: {
    stepsCompleted: 2,
    steps: 7
  }
};

export const stepped3: Story = {
  args: {
    stepsCompleted: 3,
    steps: 7
  }
};

export const stepped5: Story = {
  args: {
    stepsCompleted: 5,
    steps: 7
  }
};

export const stepped7: Story = {
  args: {
    stepsCompleted: 7,
    steps: 7
  }
};