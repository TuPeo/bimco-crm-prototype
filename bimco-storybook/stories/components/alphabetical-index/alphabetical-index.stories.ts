import { Meta, StoryObj } from "@storybook/html";
import { AlphabeticalIndex } from "./alphabetical-index";

const meta = {
    parameters: {
      layout: 'fullscreen',
    },
    title: 'Components/Listings/Alphabetical Index',
    tags: ['autodocs'],
    component: AlphabeticalIndex
  } satisfies Meta<typeof AlphabeticalIndex>;
  
export default meta;
type Story = StoryObj<typeof AlphabeticalIndex>;

export const DefaultAlphabeticalIndex: Story = {}