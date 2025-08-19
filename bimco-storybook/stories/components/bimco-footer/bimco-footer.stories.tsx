import * as React from "jsx-dom";
import type { StoryObj, Meta } from '@storybook/html';
import { BimcoFooter, BimcoFooterProps } from './bimco-footer';

const meta = {
  title: 'Components/Global/Footer',
  tags: ['autodocs'],
  component: BimcoFooter,
} satisfies Meta<typeof BimcoFooter>;

export default meta;
type Story = StoryObj<BimcoFooterProps>;

export const DefaultFooter: Story = {
};

export const BimcoSiteFooter: Story = {
  args: {
    SectionOneHeading: `\u00A9 BIMCO 2024`,
    SectionOneContent: [
      <p>The practical voice of shipping since 1905, we’ve helped our members keep world trade moving.</p>
    ],
    SectionOneLink: {
      label: "Login to MyBIMCO",
      url: "/"
    },
    SectionTwoHeading: "HEAD OFFICE",
    SectionTwoContent: [
      {
        label: "mailbox@bimco.com",
        url: "mailto:mailbox@bimco.com"
      },
      {
        label: "+45 4436 6800",
        url: "tel:+45 4436 6800"
      }
    ],
    SectionTwoLink: {
      label: "View all offices",
      url: "/"
    },
    SectionThreeHeading: "LEGAL",
    FooterLinks: [
      {
        label: "Cookies",
        url: "/"
      },
      {
        label: "Privacy Policy",
        url: "/"
      },
      {
        label: "Tems & Conditions",
        url: "/"
      },
    ],
    SectionFourHeading: "SOCIAL"
  }
};