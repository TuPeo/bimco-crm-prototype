import type { StoryObj, Meta } from '@storybook/html';
import { SlimCta } from './slim-cta';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/CTAs/Slim CTA',
  tags: ['autodocs'],
  component: SlimCta,
  argTypes: {
    theme: {
      control: 'select',
      options: ['', 'white', 'light', 'brand', 'dark']
    }
  }
} satisfies Meta<typeof SlimCta>;

export default meta;
type Story = StoryObj;

export const SlimCtaExample: Story = {
  args: {
    text: '<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac mattis leo. <span style="color: #0092BC">Ut malesuada felis.</span><h4>',
    theme: ''
  }
};