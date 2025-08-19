import type { StoryObj, Meta } from '@storybook/html';
import { DropdownSelect, DropdownSelectProps } from './dropdown-select';

const meta: Meta<DropdownSelectProps>  = {
  title: 'Elements/Form Controls/Dropdown Select',
  tags: ['autodocs'],
  component: DropdownSelect
}

export default meta;
type Story = StoryObj<DropdownSelectProps>;

export const Base: Story = {
  args: {
    id: 'fruitid',
    name: 'fruitname',
    values: ['Orange', 'Banana', 'Pomegranate'],
    label: 'Fruit Label',
    message: 'Select an option',
    error: false,
    disabled: false,
    multiple: false,
    placeholder: 'Select...'
  }
};

export const Multiple: Story = {
  args: {
    id: 'fruitid',
    name: 'fruitname',
    values: ['Orange', 'Banana', 'Pomegranate'],
    label: 'Fruit Label',
    message: 'Select multiple options',
    error: false,
    disabled: false,
    multiple: true,
    placeholder: 'Select...'
  }
};