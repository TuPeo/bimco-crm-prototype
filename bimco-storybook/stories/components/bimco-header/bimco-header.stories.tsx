import * as React from "jsx-dom";
import type { StoryObj, Meta } from '@storybook/html';
import { BimcoHeader, BimcoHeaderProps } from './bimco-header';
import { StandardNavigationMenu } from "../standard-navigation-menu/standard-navigation-menu";
import { BimcoStandardNavigationMenu } from "../standard-navigation-menu/standard-navigation-menu.stories";
import { SideComponentNavigationMenu } from "../side-component-navigation-menu/side-component-navigation-menu";
import { BimcoSideComponentNavigationMenuTextBox, BimcoSideComponentNavigationMenuSchedule, BimcoSideComponentNavigationMenuTrending } from "../side-component-navigation-menu/side-component-navigation-menu.stories";

const BimcoHeaderArgs: BimcoHeaderProps = {
  topLinks: [
    {
      label: "What we do",
      url: "/",
      navigationMenu: <StandardNavigationMenu {...BimcoStandardNavigationMenu.args} />
    },
    {
      label: "What's on?",
      url: "/",
      navigationMenu: <SideComponentNavigationMenu {...BimcoSideComponentNavigationMenuSchedule.args} />
    },
    {
      label: "News & Insights",
      url: "/",
      navigationMenu: <SideComponentNavigationMenu {...BimcoSideComponentNavigationMenuTrending.args} />
    },
    {
      label: "About",
      url: "/",
      navigationMenu: <SideComponentNavigationMenu {...BimcoSideComponentNavigationMenuTextBox.args} />
    },
  ],
  isLoggedIn: false
}

const meta: Meta<BimcoHeaderProps> = {
  parameters: {
    layout: 'fullscreen',
  },
  args: BimcoHeaderArgs,
  title: 'Components/Global/Bimco Header',
  tags: ['autodocs'],
  component: BimcoHeader
};

export default meta;
type Story = StoryObj<BimcoHeaderProps>;

export const SiteHeader: Story = {
  args: BimcoHeaderArgs
};

export const SiteHeaderLoggedIn: Story = {
  args: {
    topLinks: [
      {
        label: "What we do",
        url: "/",
        navigationMenu: <StandardNavigationMenu {...BimcoStandardNavigationMenu.args} />
      },
      {
        label: "What's on?",
        url: "/",
        navigationMenu: <SideComponentNavigationMenu {...BimcoSideComponentNavigationMenuSchedule.args} />
      },
      {
        label: "News & Insights",
        url: "/",
      },
      {
        label: "About",
        url: "/",
        navigationMenu: <SideComponentNavigationMenu {...BimcoSideComponentNavigationMenuTextBox.args} />
      },
    ],
    isLoggedIn: true
  }
};

export const SiteHeaderWithScrollIndicator: Story = {
  args: { ...BimcoHeaderArgs, scrollIndicator: true }
};
