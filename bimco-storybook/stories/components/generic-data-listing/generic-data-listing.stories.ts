import type { Meta, StoryObj } from "@storybook/html";
import { GenericDataListing } from "./generic-data-listing";

// Metadata for Storybook
const meta: Meta<typeof GenericDataListing> = {
  title: "Components/Listings/Generic Data Listing",
  component: GenericDataListing,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  }
};

export default meta;
type Story = StoryObj<typeof GenericDataListing>;

export const DefaultGenericDataListing: Story = {}
