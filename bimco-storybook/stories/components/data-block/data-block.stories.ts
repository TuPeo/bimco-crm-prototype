import type { StoryObj, Meta } from '@storybook/html';
import { DataBlock, DataBlockArgs } from './data-block';
import { TableBaseArgs, TableMaximumSizeArgs, TableLinksArgs } from '../../elements/table/table';
import { FilterPorts, FilterWorkingHours } from '../../elements/form-control/simple-select/simple-select.stories';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Content Blocks/Data Block',
  tags: ['autodocs'],
  component: DataBlock
} satisfies Meta<DataBlockArgs>;

export default meta;
type Story = StoryObj<DataBlockArgs>;

export const PortHoursAndHolidays: Story = {
  args: {
    id: "port-hours",
    heading: "Port hours & holidays",
    topFilter: FilterPorts.args,
    filtersHeading: "Local holidays and working hours",
    filters: [FilterPorts.args, FilterWorkingHours.args],
    tabs: [
      {
        label: "Mon",
        table: TableBaseArgs
      },
      {
        label: "Tue",
        table: TableBaseArgs
      },
      {
        label: "Wed",
        table: TableBaseArgs
      },
      {
        label: "Thu",
        table: TableBaseArgs
      },
      {
        label: "Fri",
        table: TableBaseArgs
      },
      {
        label: "Sat",
        table: TableMaximumSizeArgs
      },
      {
        label: "Sun",
        table: TableMaximumSizeArgs
      }
    ]
  }
};

export const MaximumSize: Story = {
  args: {
    id: "max-size",
    heading: "Maximum Size",
    tabs: [{
      label: "",
      table: TableMaximumSizeArgs
    }]
  }
};

export const Links: Story = {
  args: {
    id: "links-table",
    heading: "Links",
    tabs: [{
      label: "",
      table: TableLinksArgs
    }]
  }
};
