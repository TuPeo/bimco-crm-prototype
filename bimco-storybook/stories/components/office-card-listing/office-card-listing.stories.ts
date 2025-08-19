import { Meta, StoryObj } from "@storybook/html";
import { OfficeCardListing, OfficeCardListingProps } from "./office-card-listing";
import { CopenhagenArgs, BrusselsArgs, HoustonArgs, AthensArgs } from "../../elements/office-card/office-card";

const meta: Meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Listings/Office Card Listing',
  tags: ['autodocs'],
  component: OfficeCardListing
};

export default meta;
type Story = StoryObj<OfficeCardListingProps>;

export const Base: Story = {
  args: {
    title: "Our Offices",
    summary: "From our offices in Copenhagen, Houston, London, Athens, Brussels, Singapore and Shanghai we aim to help build a resilient industry in a sustainable future whilst protecting world trade.",
    cards: [
      CopenhagenArgs, 
      BrusselsArgs, 
      HoustonArgs, 
      AthensArgs,
      CopenhagenArgs, 
      BrusselsArgs, 
      AthensArgs
    ]
  }
};
