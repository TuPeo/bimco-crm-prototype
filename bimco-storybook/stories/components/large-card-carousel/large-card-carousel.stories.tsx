import {
  LargeCardCarousel,
  LargeCardCarouselProps,
} from "./large-card-carousel";
import { Meta, StoryObj } from "@storybook/html";

const meta = {
  title: "Components/Carousels/Large Card Carousel",
  component: LargeCardCarousel,
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<LargeCardCarouselProps>;

export default meta;
type Story = StoryObj<LargeCardCarouselProps>

export const DefaultCarousel = {
  args: {
    title: "Don’t just take our word for it...",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    theme: "white",
    cards: [
      {
        imageSrc: "media/Sample_Portrait_01-600x800.jpg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus, lorem at euismod mollis, mauris ligula ornare nunc, a varius velit massa non dolor.",
        name: "John Doe",
        company: "COSCO Shipping",
        theme: "light-blue"
      },
      {
        imageSrc: "media/Sample_Portrait_02-600x800.jpg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus, lorem at euismod mollis, mauris ligula ornare nunc, a varius velit massa non dolor.",
        name: "Jane Doe",
        company: "Maersk",
        theme: "orange"
      },
      {
        imageSrc: "media/Sample_Portrait_01-600x800.jpg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus, lorem at euismod mollis, mauris ligula ornare nunc, a varius velit massa non dolor.",
        name: "Anna Smith",
        company: "Hapag-Lloyd",
        theme: "cyan"
      },
    ],
    ctaCard: {
      title: "Start your membership today",
      description:
        "Become a BIMCO member today to access exclusive resources and much more...",
      ctaPrimaryLabel: "Sign up",
      ctaPrimaryUrl: "#",
      ctaSecondaryLabel: "Learn more",
      ctaSecondaryUrl: "#",
    },
  }
} satisfies Story;

export const TwoCardsOnly = {
  args: {
    title: "Our Customers Say...",
    theme: "dark",
    description: "Testimonials from our satisfied customers.",
    cards: [
      {
        imageSrc: "media/Sample_Portrait_01-600x800.jpg",
        content: "The service provided was exceptional!",
        name: "John Doe",
        company: "COSCO Shipping",
        theme: "light-blue"
      },
      {
        imageSrc: "media/Sample_Portrait_02-600x800.jpg",
        content: "Highly recommend to anyone!",
        name: "Jane Doe",
        company: "Maersk",
        theme: "orange"
      },
    ],
  }
} satisfies Story;
