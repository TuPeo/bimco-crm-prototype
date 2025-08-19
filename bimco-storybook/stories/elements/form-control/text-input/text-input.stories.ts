import type { StoryObj, Meta } from '@storybook/html';
import { TextInput, TextInputProps } from './text-input';

const meta: Meta<TextInputProps> = {
  title: 'Elements/Form Controls/Text Input',
  tags: ['autodocs'],
  component: TextInput
}

export default meta;
type Story = StoryObj<TextInputProps>;

export const Base: Story = {
  args: {
    elementType: 'input',
    id: 'username',
    label: 'Username',
    placeholder: 'john-smith',
    message: 'Enter your username',
    error: false,
    disabled: false,
    optional: true,
    password: false
  }
};

export const Password: Story = {
  args: {
    elementType: 'input',
    id: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    message: 'Secure passwords only',
    error: false,
    disabled: false,
    optional: false,
    password: true
  }
};

export const Textarea: Story = {
  args: {
    elementType: 'textarea',
    id: 'textarea',
    label: 'Message',
    placeholder: 'Enter your message',
    message: 'Send us a message',
    error: false,
    disabled: false,
    optional: false,
    password: false
  }
};