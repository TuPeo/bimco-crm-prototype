import type { StoryObj, Meta } from '@storybook/html';
import { StandardNavigationMenu } from './standard-navigation-menu';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Navigation/Standard Navigation Menu',
  tags: ['autodocs'],
  component: StandardNavigationMenu,
  argTypes: {
    theme: {
      control: 'select',
      options: ['', 'white', 'light', 'brand', 'dark']
    }
  }
} satisfies Meta<typeof StandardNavigationMenu>;

export default meta;
type Story = StoryObj;

export const BimcoStandardNavigationMenu: Story = {
  args: {
    linkSets: [
      {
        parentLink: {
          label: "Membership",
          url: "/"
        },
        childLinks: [
          {
            label: "About",
            url: "/"
          },
          {
            label: "Benefits",
            url: "/"
          },
          {
            label: "How to join",
            url: "/"
          }
        ]
      },
      {
        parentLink: {
          label: "Contracts",
          url: "/"
        },
        childLinks: [
          {
            label: "Documentary work and processes",
            url: "/"
          },
          {
            label: "Contracts and clauses",
            url: "/"
          }
        ]
      },
      {
        parentLink: {
          label: "Regulation",
          url: "/"
        },
        childLinks: [
          {
            label: "Regulatory work and processes-link",
            url: "/"
          },
          {
            label: "Policy positions",
            url: "/"
          }
        ]
      },
      {
        parentLink:
        {
          label: "Products & Services",
          url: "/"
        },
        childLinks: [

          {
            label: "SmartCon",
            url: "/"
          },
          {
            label: "SHIP PI",
            url: "/"
          },
          {
            label: "Publications",
            url: "/"
          },
          {
            label: "Training",
            url: "/"
          },
          {
            label: "Ports & Cargo",
            url: "/"
          }
        ]
      },
    ]
  }
};