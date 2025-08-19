import { Meta, StoryObj } from "@storybook/html";
import { MediaInset } from "./media-inset";

// Metadata for Storybook
const meta: Meta<typeof MediaInset> = {
  title: "Components/Media/MediaInset",
  component: MediaInset,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    asymmetrical: {
      control: "boolean",
      description: "Enable or disable asymmetrical layout",
    },
    variant: {
      control: { type: "radio" },
      options: ["left", "right"],
      description: "Choose the orientation when asymmetrical (left or right)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MediaInset>;

// Story with 1 image
export const OneImage: Story = {
  args: {
    images: [
      {
        image: { url: "media/hero-banner-lg.jpeg", alt: "Sample Image 1" },
        description: "This is a sample description for Image 1.",
      },
    ],
    asymmetrical: false,
  },
};

// Story with 2 images (symmetrical)
export const TwoImagesSymmetrical: Story = {
  args: {
    images: [
      {
        image: { url: "media/hero-banner-lg.jpeg", alt: "Sample Image 1" },
        description: "This is a sample description for Image 1.",
      },
      {
        image: {
          url: "media/feature-cta-banner-background-image.png",
          alt: "Sample Image 2",
        },
        description: "This is a sample description for Image 2.",
      },
    ],
    asymmetrical: false,
  },
};

// Story with 2 images (asymmetrical)
export const TwoImagesAsymmetrical: Story = {
  args: {
    images: [
      {
        image: {
          url: "media/feature-cta-banner-inner.jpg",
          alt: "Sample Image 1",
        },
        description: "This is a sample description for Image 1.",
      },
      {
        image: { url: "media/hero-banner-lg.jpeg", alt: "Sample Image 2" },
        description: "This is a sample description for Image 2.",
      },
    ],
    asymmetrical: true,
    variant: "left",
  },
};

// Story with 3 images
export const ThreeImages: Story = {
  args: {
    images: [
      {
        image: { url: "media/hero-shot0.png", alt: "Sample Image 1" },
        description: "This is a sample description for Image 1.",
      },
      {
        image: { url: "media/hero-banner-lg.jpeg", alt: "Sample Image 2" },
        description: "This is a sample description for Image 2.",
      },
      {
        image: {
          url: "media/feature-cta-banner-background-image.png",
          alt: "Sample Image 3",
        },
        description: "This is a sample description for Image 3.",
      },
    ],
    asymmetrical: false,
  },
};
