import type { StoryObj, Meta } from '@storybook/html';
import { CheckboxRadioList, CheckboxRadioListProps } from './checkbox-radio-list';

const meta: Meta<CheckboxRadioListProps> = {
  title: 'Elements/Form Controls/Checkbox Radio List',
  tags: ['autodocs'],
  component: CheckboxRadioList
}

export default meta;
type Story = StoryObj<CheckboxRadioListProps>;

export const CheckboxList: Story = {
  args: {
    inputType: 'checkbox',
    id: 'fruits-checkboxes',
    label: 'Fruits',
    items: [{
      value: 'Orange', disabled: false
    }, {
      value: 'Banana', disabled: false
    }, {
      value: 'Pomegranate', disabled: true
    }],
    message: 'Select one or more fruits',
    error: false,
    optional: true,
  }
};

export const RadioButtonList: Story = {
  args: {
    inputType: 'radio',
    id: 'fruits-radiobuttons',
    label: 'Fruits',
    items: [{
      value: 'Orange', disabled: false
    }, {
      value: 'Banana', disabled: false
    }, {
      value: 'Pomegranate', disabled: true
    }],
    message: 'Select one fruit',
    error: false,
    optional: true,
  }
};
