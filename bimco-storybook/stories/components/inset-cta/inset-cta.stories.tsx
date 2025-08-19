import * as React from "jsx-dom";
import { Meta, StoryObj } from "@storybook/html";
import { InsetCta, InsetCtaProps } from "./inset-cta";

const meta = {
  title: "Components/CTAs/Inset CTA",
  tags: ["autodocs"],
  component: InsetCta,
  argTypes: {
    wash: {
      control: "boolean",
      description: "Enables or disables the background wash overlay",
    },
    theme: {
      control: {
        type: "select",
      },
      options: [undefined, "light", "dark", "white", "brand"],
      description: "Select a theme (light, dark, white, brand, or undefined)",
    },
  },
} satisfies Meta<InsetCtaProps>;

export default meta;
type Story = StoryObj<InsetCtaProps>;

const InsetBaseContent = [
  <h3 class="headline-5">
    <span class="eyebrow">Member exclusive story</span> 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac mattis leo. <em>Ut malesuada felis.</em>
  </h3>,
  <p>Become a BIMCO member today to access exclusive resources and much more...</p>
];

export const NoBackgroundNoWash: Story = {
  render: (args) => InsetCta({ ...args, children: InsetBaseContent }),
  args: {
    wash: false,
    theme: 'light',
    ctas: [
      { type: 'primary', label: 'Discover' },
      { type: 'secondary', label: 'Join us' }
    ]
  },
};

export const WithBackgroundNoWash: Story = {
  render: (args) => InsetCta({ ...args, children: InsetBaseContent }),
  args: {
    ...NoBackgroundNoWash.args,
    background: {
      url: "media/inset-cta.png",
      alt: "Example background",
    },
  },
};

export const WithBackgroundAndWash: Story = {
  render: (args) => InsetCta({ ...args, children: InsetBaseContent }),
  args: {
    ...NoBackgroundNoWash.args,
    background: {
      url: "media/inset-cta.png",
      alt: "Example background with wash",
    },
    wash: true,
  },
};
