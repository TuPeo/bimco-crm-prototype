import type { StoryObj, Meta } from '@storybook/html';
import { CheckboxInput, CheckboxInputProps } from './checkbox-input';

const meta: Meta<CheckboxInputProps> = {
  title: 'Elements/Form Controls/Checkbox Input',
  tags: ['autodocs'],
  component: CheckboxInput
}

export default meta;
type Story = StoryObj<CheckboxInputProps>;

export const Base: Story = {
  args: {
    id: 'send-me-email',
    label: 'Send me email',
    message: 'Tick to have email sent',
    error: false,
    disabled: false,
    optional: true,
  }
};

export const DataConsent: Story = {
  args: {
    id: 'data-consent',
    label: 'Data consent',
    message: 'I agree to the terms and conditions and privacy policy',
    error: false,
    disabled: false,
    optional: false,
  }
};
