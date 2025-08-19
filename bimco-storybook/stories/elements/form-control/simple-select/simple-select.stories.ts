import type { StoryObj, Meta } from '@storybook/html';
import { SimpleSelect, SimpleSelectProps } from './simple-select';

const meta: Meta<SimpleSelectProps> = {
  title: 'Elements/Form Controls/Simple Select',
  tags: ['autodocs'],
  component: SimpleSelect
}

export default meta;
type Story = StoryObj<SimpleSelectProps>;

export const Base: Story = {
  args: {
    id: 'fruitid',
    values: ['Orange', 'Banana', 'Pomegranate'],
    disabled: false
  }
};

export const FilterPorts: Story = {
  args: {
    id: 'port',
    values: ['Port', 'Port/Copenhagen', 'Port/Southampton'],
    disabled: false
  }
};

export const FilterWorkingHours: Story = {
  args: {
    id: 'working-hours',
    values: ['Working Hours', 'Working Hours/Full Time', 'Working Hours/Part Time'],
    disabled: false
  }
};
