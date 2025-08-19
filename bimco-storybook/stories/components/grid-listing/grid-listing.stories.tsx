import { Meta, StoryObj } from "@storybook/html";
import { GridListing, GridListingArgs } from "./grid-listing";
import { ReusableCard, NewsArgs } from '../../elements/reusable-card/reusable-card';

const meta: Meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Listings/Grid Listing',
  tags: ['autodocs'],
  component: GridListing
};

export default meta;
type Story = StoryObj<GridListingArgs>;

export const Base: Story = {
  args: {},
  render: (args) => GridListing({
    ...args, children: [
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs })
    ]
  })
};

export const ListingWithTeaser: Story = {
  args: {
    title: "Press releases",
    link: "Browse all",
    teaserLink: {
      label: "Explore all news & insights",
      url: "https//www.example.com#explore-all"
    }
  },
  render: (args) => GridListing({
    ...args, children: [
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs }),
      ReusableCard({ ...NewsArgs })
    ]
  })
};