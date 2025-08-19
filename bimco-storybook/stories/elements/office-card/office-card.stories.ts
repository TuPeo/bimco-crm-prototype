import type { StoryObj, Meta } from '@storybook/html';
import { OfficeCard, OfficeCardProps, CopenhagenArgs, BrusselsArgs, HoustonArgs, AthensArgs } from "./office-card";

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Elements/Carousels/Office Card',
  tags: ['autodocs'],
  component: OfficeCard,
  argTypes: {
    theme: {
      control: {
        type: "select",
        options: ["orange", "red", "green", "blue"],
      },
    },
  },
} satisfies Meta<typeof OfficeCard>;

export default meta;
type Story = StoryObj<OfficeCardProps>;

export const Copenhagen: Story = {
  args: CopenhagenArgs
};

export const Brussels: Story = {
  args: BrusselsArgs
};

export const Houston: Story = {
  args: HoustonArgs
};

export const Athens: Story = {
  args: AthensArgs
};
