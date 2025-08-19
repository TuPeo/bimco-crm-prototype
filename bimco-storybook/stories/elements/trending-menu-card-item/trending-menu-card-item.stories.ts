import { Meta, StoryObj } from "@storybook/html";
import { TrendingMenuCardItem, TrendingMenuCardItemProps } from "./trending-menu-card-item";

// Metadata for Storybook
const meta = {
  title: "Elements/Navigation/Trending Menu Card Item",
  component: TrendingMenuCardItem,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["increasing", "decreasing", "neutral"],
      description: "Set the variant (increasing, decreasing, or neutral)",
    },
    ranking: {
      control: "text",
      description: "Set the ranking (optional, accepts string)",
    },
  },
} satisfies Meta<TrendingMenuCardItemProps>;

export default meta;
type Story = StoryObj<TrendingMenuCardItemProps>;

// Default story
export const TrendingMenuCardDefault = {
  args: {
    title: "Content title in here",
    description: "Description in here",
    ranking: "01",
    variant: "neutral",
  },
} satisfies Story;

// Story with increasing variant
export const TrendingMenuCardIncreasing = {
  args: {
    title: "Content title in here",
    description: "Description in here",
    ranking: "02",
    variant: "increasing",
  },
} satisfies Story;

// Story with decreasing variant
export const TrendingMenuCardDecreasing = {
  args: {
    title: "Content title in here",
    description: "Description in here",
    ranking: "03",
    variant: "decreasing",
  },
} satisfies Story;
