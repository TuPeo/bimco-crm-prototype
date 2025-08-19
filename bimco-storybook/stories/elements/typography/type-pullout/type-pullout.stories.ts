import type { StoryObj, Meta } from '@storybook/html';
import type { TypePulloutProps } from './type-pullout';
import { TypePullout } from './type-pullout';

const meta = {
  title: 'Elements/Typography/Type Pullout',
  tags: ['autodocs'],
  component: TypePullout,
  argTypes: {
    text: { control: 'text' },
  }
} satisfies Meta<TypePulloutProps>;

export default meta;
type Story = StoryObj<TypePulloutProps>;

export const SingleLine: Story = {};

export const MultipleLines: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultricies quam vel'
      + ' magna vestibulum, non consequat dolor vehicula. Pellentesque sit amet felis nulla.'
      + ' Vivamus varius dictum orci, nec vestibulum neque fermentum id.'
  }
};