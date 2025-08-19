import type { StoryObj, Meta } from '@storybook/html';
import { DateInput, DateInputProps } from './date-input';

const meta: Meta<DateInputProps> = {
  title: 'Elements/Form Controls/Date Input',
  tags: ['autodocs'],
  component: DateInput
}

export default meta;
type Story = StoryObj<DateInputProps>;

export const Base: Story = {
  args: {
    id: 'date-of-birth',
    label: 'Date of birth',
    placeholder: '',
    message: 'Enter your date of birth',
    error: false,
    disabled: false,
    optional: true
  }
};
