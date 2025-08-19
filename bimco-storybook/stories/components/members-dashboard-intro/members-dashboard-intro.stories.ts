import { Meta, StoryObj } from "@storybook/html";
import { MembersDashboardIntro, MembersDashboardIntroArgs } from "./members-dashboard-intro";

const meta: Meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Members/Members Dashboard Intro',
  tags: ['autodocs'],
  component: MembersDashboardIntro
};

export default meta;
type Story = StoryObj<MembersDashboardIntroArgs>;

export const Base: Story = {
  args: {
    greeting: "Welcome back,",
    username: "Anna",
    highlightColour: "#E5740E",
    company: "Grieg",
    icon: {
      url: "media/feature-cta-banner-inner.jpg",
      alt: "User icon"
    },
    banner: {
      url: "media/feature-cta-banner-background-image.png",
      alt: "Personalised background",
    }
  }
};

export const Companyless: Story = {
  args: {
    greeting: "Welcome back,",
    username: "Talan",
    highlightColour: "#269E8A",
    icon: {
      url: "media/feature-cta-banner-inner.jpg",
      alt: "User icon"
    },
    banner: {
      url: "media/feature-cta-banner-background-image.png",
      alt: "Personalised background",
    }
  }
};

