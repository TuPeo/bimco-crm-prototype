import type { StoryObj, Meta } from '@storybook/html';
import type { BulletListProps } from './bullet-list';
import { BulletList } from './bullet-list';

const meta = {
  title: 'Elements/Typography/Bullet List',
  tags: ['autodocs'],
  component: BulletList,
  argTypes: {
    bulletPoints: { control: "text" }
  }
} satisfies Meta<BulletListProps>;

export default meta;
type Story = StoryObj<BulletListProps>;

export const BulletPoints: Story = {
};