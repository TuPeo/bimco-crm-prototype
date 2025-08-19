import type { StoryObj, Meta } from '@storybook/html';

import { NavigationCardList, NavigationCardListProps } from "./navigation-card-list";
import { ScheduleCard } from "../../elements/schedule-card/schedule-card";
import { ScheduleCardExample } from "../../elements/schedule-card/schedule-card.stories";
import { TrendingMenuCardItem } from "../../elements/trending-menu-card-item/trending-menu-card-item";
import { TrendingMenuCardDecreasing, TrendingMenuCardDefault, TrendingMenuCardIncreasing } from "../../elements/trending-menu-card-item/trending-menu-card-item.stories";

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Navigation/Navigation Card List',
  tags: ['autodocs'],
  component: NavigationCardList
} satisfies Meta<NavigationCardListProps>;

export default meta;
type Story = StoryObj<NavigationCardListProps>;

export const ScheduleList = {
  render: (args) => NavigationCardList({ ...args, children: [
    ScheduleCard({ ...ScheduleCardExample.args }),
    ScheduleCard({ ...ScheduleCardExample.args }),
    ScheduleCard({ ...ScheduleCardExample.args })
  ]}),
  args: {
    slideCssClass: "schedule-card"
  }
} satisfies Story;

export const TrendingList = {
  render: (args) => NavigationCardList({ ...args, children: [
    TrendingMenuCardItem({ ...TrendingMenuCardDefault.args }),
    TrendingMenuCardItem({ ...TrendingMenuCardIncreasing.args }),
    TrendingMenuCardItem({ ...TrendingMenuCardDecreasing.args })
  ]}),
  args: {
    slideCssClass: "trending-menu-card-item"
  }
} satisfies Story;