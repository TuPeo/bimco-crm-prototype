import * as React from "jsx-dom";
import type { StoryObj, Meta } from '@storybook/html';
import { SideComponentNavigationMenu } from './side-component-navigation-menu';
import { NavigationMenuTextBox } from "../navigation-menu-text/navigation-menu-text";
import { TextBoxExample } from "../navigation-menu-text/navigation-menu-text.stories";
import { NavigationCardList } from "../navigation-card-list/navigation-card-list";
import { ScheduleList, TrendingList } from "../navigation-card-list/navigation-card-list.stories";

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Navigation/Side Component Navigation Menu',
  tags: ['autodocs'],
  component: SideComponentNavigationMenu,
  argTypes: {
    theme: {
      control: 'select',
      options: ['', 'white', 'light', 'brand', 'dark'],
    }
  }
} satisfies Meta<typeof SideComponentNavigationMenu>;

export default meta;
type Story = StoryObj<typeof SideComponentNavigationMenu>;

export const BimcoSideComponentNavigationMenuTextBox = {
  args: {
    parentLink: {
      label: "Explore all",
      url: "/"
    },
    linksEyebrowText: "EXPLORE",
    links: [
      {
        label: "Our Mission",
        url: "/"
      },
      {
        label: "Our People",
        url: "/"
      },
      {
        label: "Governance",
        url: "/"
      },
      {
        label: "Board & Executive",
        url: "/"
      },
      {
        label: "Committees",
        url: "/"
      },
    ],
    sideComponentEyebrowText: "OVERVIEW",
    sideComponent: <NavigationMenuTextBox {...TextBoxExample.args}/>
  }
} satisfies Story;

export const BimcoSideComponentNavigationMenuSchedule = {
  args: {
    parentLink: {
      label: "Explore all",
      url: "/"
    },
    linksEyebrowText: "BROWSE BY TYPE",
    links: [
      {
        label: "Events",
        url: "#"
      },
      {
        label: "Training",
        url: "#"
      },
      {
        label: "Attending",
        url: "#"
      },
      {
        label: "Supporting",
        url: "#"
      },
    ],
    sideComponentEyebrowText: "SCHEDULE",
    sideComponent: <NavigationCardList {...ScheduleList.args} />
  }
} satisfies Story;

export const BimcoSideComponentNavigationMenuTrending = {
  args: {
    parentLink: {
      label: "Explore all",
      url: "#"
    },
    linksEyebrowText: "EXPLORE",
    links: [
      {
        label: "News",
        url: "#"
      },
      {
        label: "Insights",
        url: "#"
      },
      {
        label: "Market Analysis",
        url: "#"
      },
      {
        label: "Press",
        url: "#"
      },
      {
        label: "Policies & Campaigns",
        url: "#"
      },
    ],
    sideComponentEyebrowText: "TRENDING",
    sideComponent: <NavigationCardList {...TrendingList.args} />
  }
} satisfies Story;