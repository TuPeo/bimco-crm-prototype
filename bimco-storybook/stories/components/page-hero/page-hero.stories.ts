import type { Meta, StoryObj } from "@storybook/html";
import { PageHero } from "./page-hero";
import { Breadcrumbs, crumbs } from "../breadcrumbs/breadcrumbs";

const meta: Meta<typeof PageHero> = {
  title: "Components/Hero Banners/Page Hero",
  component: PageHero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    style: {
      control: { type: "radio" },
      options: ["default", "landing-page"],
      description: "Select the page hero style",
    },
    wash: {
      control: "boolean",
      description: "Enable or disable the background wash",
    },
    background: {
      control: "object",
      defaultValue: {
        url: "media/hero-shot0.png",
        alt: "waves background"
      },
    }
  },
};

export default meta;
type Story = StoryObj<typeof PageHero>;

export const DefaultPageHero: Story = {
  args: {
    title: "Page title goes in here",
    description:
      "Your source for the latest updates and expert analysis in the maritime industry. Stay informed on market trends, regulatory changes, and technological advancements with our curated content.",
    style: "default",
    wash: true,
    children: [
      Breadcrumbs({ crumbs: crumbs, contextClass: 'page-hero__breadcrumbs'})
    ]
  },
};

export const PageHeroSimple: Story = {
  args: {
    title: "Page title goes in here",
    style: "default",
    wash: false,
    background: null,
  },
};

export const PageHeroWithImageAndWash: Story = {
  args: {
    title: "Page title goes in here",
    description:
      "Your source for the latest updates and expert analysis in the maritime industry. Stay informed on market trends, regulatory changes, and technological advancements with our curated content.",
    background: {
      url: "media/global_regulation-001-3440px.jpg",
      alt: "waves background",
    },
    style: "default",
    wash: true,
    children: [
      Breadcrumbs({ crumbs: crumbs, contextClass: 'page-hero__breadcrumbs'})
    ]
  },
};

export const PageHeroImageNoWash: Story = {
  args: {
    title: "Page title goes in here",
    description:
      "Your source for the latest updates and expert analysis in the maritime industry. Stay informed on market trends, regulatory changes, and technological advancements with our curated content.",
    background: {
      url: "media/hero-shot0.png",
      alt: "waves background",
    },
    style: "default",
    wash: false,
    children: [
      Breadcrumbs({ crumbs: crumbs, contextClass: 'page-hero__breadcrumbs'})
    ]
  },
};

export const LandingPageHeroWithImageAndWash: Story = {
  args: {
    title: "Landing Page Hero Title",
    description:
      "Your source for the latest updates and expert analysis in the maritime industry. Stay informed on market trends, regulatory changes, and technological advancements with our curated content.",
    background: {
      url: "media/hero-shot0.png",
      alt: "Background with a scenic image",
    },
    style: "landing-page",
    wash: true,
    children: [
      Breadcrumbs({ crumbs: crumbs, contextClass: 'page-hero__breadcrumbs'})
    ]
  },
};

export const LandingPageHeroImageNoWash: Story = {
  args: {
    title: "Landing Page Hero Title",
    description:
      "Your source for the latest updates and expert analysis in the maritime industry. Stay informed on market trends, regulatory changes, and technological advancements with our curated content.",
    background: {
      url: "media/hero-shot0.png",
      alt: "Background with a scenic image",
    },
    style: "landing-page",
    wash: false,
    children: [
      Breadcrumbs({ crumbs: crumbs, contextClass: 'page-hero__breadcrumbs'})
    ]
  },
};
