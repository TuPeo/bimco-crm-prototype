import * as React from "jsx-dom";
import type { StoryObj, Meta } from "@storybook/html";
import { InsetCardBanner } from "./inset-card-banner";
import { InsetCta } from "../inset-cta/inset-cta";
import ImageArgs from "../../types/image-args";

const meta = {
  title: "Components/Banners/Inset Card Banner",
  component: InsetCardBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const contextClass = "inset-card-banner__item";
const backgroundImage: ImageArgs = {
  url: "media/inset-cta.png",
  alt: "Example background image",
};

const insets = [
  InsetCta({
    index: 0,
    contextClass: contextClass,
    theme: "dark",
    background: backgroundImage,
    wash: true,
    children: [
      <h4>Lorem ipsum dolor sit amet</h4>,
      <h4>Ut malesuada felis</h4>,
      <p>This is some additional body content.</p>
    ]
  }),
  InsetCta({
    index: 1,
    contextClass: contextClass,
    theme: "light",
    children: [
      <h4>Inset 2 Headline</h4>,
      <h4>Inset 2 Subheadline</h4>,
      <p>This is body content for the second inset.</p>
    ]
  }),
  InsetCta({
    index: 2,
    contextClass: contextClass,
    theme: "white",
    children: [
      <h4>Inset 3 Headline</h4>,
      <h4>Inset 3 Subheadline</h4>,
      <p>This is body content for the third inset.</p>
    ]
  }),
  InsetCta({
    index: 3,
    contextClass: contextClass,
    theme: "dark",
    children: [
      <h4>Inset 4 Headline</h4>,
      <h4>Inset 4 Subheadline</h4>,
      <p>This is body content for the fourth inset.</p>
    ]
  }),
  InsetCta({
    index: 4,
    contextClass: contextClass,
    theme: "dark",
    children: [
      <h4>Inset 5 Headline</h4>,
      <h4>Inset 5 Subheadline</h4>,
      <p>This is body content for the fifth inset.</p>
    ]
  })
]

export const TwoInsetCards: Story = {
  render: () => InsetCardBanner({
    children: [
      insets.slice(0, 2)
    ]
  })
};

export const ThreeInsetCards: Story = {
  render: () => InsetCardBanner({
    children: [
      insets.slice(0, 3)
    ]
  })
};

export const FourInsetCards: Story = {
  render: () => InsetCardBanner({
    children: [
      insets.slice(0, 4)
    ]
  })
};
