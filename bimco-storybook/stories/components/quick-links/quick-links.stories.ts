import type { StoryObj, Meta } from '@storybook/html';
import { QuickLinks, QuickLinksProps } from './quick-links';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Navigation/Quick Links',
  tags: ['autodocs'],
  component: QuickLinks,
} satisfies Meta<QuickLinksProps>;

export default meta;
type Story = StoryObj<QuickLinksProps>;

export const QuickLinksDefault = {
  args: {
    eyebrowText: "What we offer",
    text: "To be at the forefront of global developments in shipping, we provide expert knowledge and practical advice to safeguard and add value to our members’ businesses.",
    callToActions: [
      {
        type: "secondary",
        href: "#",
        label: "Discover more"
      }
    ],
    quickLinks: [
      {
        link: {
          url: "#",
          label: "Contracts"
        },
        icon: "anchor"
      },
      {
        link: {
          url: "#",
          label: "Training"
        },
        icon: "anchor"
      },
      {
        link: {
          url: "#",
          label: "SmartCon"
        },
        icon: "anchor"
      },
      {
        link: {
          url: "#",
          label: "ShipPI"
        },
        icon: "anchor"
      },
      {
        link: {
          url: "#",
          label: "Market Analysis"
        },
        icon: "anchor"
      }
    ]
  }
} satisfies Story;