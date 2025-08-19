import type { StoryObj, Meta } from '@storybook/html';
import { PersonArgs, PersonLandscapeArgs, NewsArgs, ReusableCard, ReusableCardArgs, NewsNoImageArgs } from './reusable-card';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Elements/Listings/Reusable Card',
  tags: ['autodocs'],
  component: ReusableCard,
  argTypes: {
    image: {
      control: "object"
    },
    tags: {
      control: "object",
    },
    links: {
      control: "object",
    },
    variant: {
      control: "select",
      options: ['news', 'event', 'person', 'teaser']
    }
  }
} satisfies Meta<typeof ReusableCard>;

export default meta;
type Story = StoryObj<ReusableCardArgs>;

export const Person = {
  args: { ...PersonArgs }
} satisfies Story;

export const PersonLandscape = {
  args: { ...PersonLandscapeArgs }
} satisfies Story;

export const Event = {
  args: {
    image: {
      url: "media/news-detail-hero-banner.jpg",
      alt: "Conference"
    },
    imagePopout: "01 OCT",
    cardTags: [{
      title: "Conference"
    },
    {
      title: "Panama City, Panama",
      iconStyle: "solid",
      iconBefore: "location-dot"
    }],
    title: "Xeneta Summit 2024 - Discover an Ocean of Opportunity",
    links: [
      {
        type: "secondary",
        size: "large",
        label: "More Info",
        href: "/",
        iconStyle: "regular",
        iconAfter: "arrow-right"
      },
    ],
    hoverDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a diam eu ex vulputate tincidunt non fermentum est. Nam aliquam at orci eu fringilla. Vivamus iaculis sem non velit ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam at orci eu fringilla.",
    hoverTags: [
      {
        iconStyle: "solid",
        iconBefore: "location-dot",
        title: "Panama City",
        subtitle: "Panama"
      },
      {
        iconStyle: "solid",
        iconBefore: "calendar",
        title: "01 Oct - 03 Oct 2024",
        subtitle: "3 days"
      },
      {
        iconStyle: "solid",
        iconBefore: "user-tie",
        title: "Thomas Daamsgard",
        subtitle: "Head of Americas, BIMCO"
      },
      {
        iconStyle: "solid",
        iconBefore: "keynote",
        title: "Conference",
        subtitle: "Maritime Digitalisation, Ports"
      },
      {
        iconStyle: "solid",
        iconBefore: "user",
        title: "6 Available Seats",
      },
    ],
    variant: "event",
    orientation: "none"
  }
} satisfies Story;

export const News = {
  args: { ...NewsArgs }
} satisfies Story;

export const NewsNoImage = {
  args: { ...NewsNoImageArgs }
} satisfies Story

export const Teaser = {
  args: {
    image: {
      url: "media/feature-cta-banner-inner.jpg",
      alt: "Insights"
    },
    cardTags: [{
      title: "Insights"
    },
    {
      title: "21 August 2024"
    },
    {
      title: "Greenwich",
      iconStyle: "solid",
      iconBefore: "location-dot"
    }],
    title: "Liquid cargo of the month September 2024 - Resin oil, distilled lorem",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at sapien libero. Pellentesque cursus imperdiet nibh, nec facilisis tellus tempus at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at sapien libero. Pellentesque cursus imperdiet nibh, nec facilisis tellus tempus at.",
    links: [
      {
        type: "link",
        href: "/",
        label: "Read more"
      }
    ],
    variant: "teaser",
    orientation: "portrait"
  }
} satisfies Story;