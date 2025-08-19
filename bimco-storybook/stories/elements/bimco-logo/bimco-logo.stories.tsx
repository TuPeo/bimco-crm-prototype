import type { StoryObj, Meta } from '@storybook/html';
import { BimcoLogo } from './bimco-logo';

const meta = {
  title: 'Elements/Global/BIMCO Logo',
  tags: ['autodocs'],
  component: BimcoLogo
} satisfies Meta<typeof BimcoLogo>;

export default meta;
type Story = StoryObj<typeof BimcoLogo>;

export const BimcoSiteLogo: Story = {
};