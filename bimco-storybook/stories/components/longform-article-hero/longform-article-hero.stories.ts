import type { StoryObj, Meta } from '@storybook/html';
import { LongformArticleHero, LongformArticleHeroProps } from './longform-article-hero';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Hero Banners/Longform Article Hero',
  tags: ['autodocs'],
  component: LongformArticleHero,
  argTypes: {
    theme: {
      control: {
        type: "select",
      },
      options: ["", "light", "dark", "white", "brand"],
    }
  },
} satisfies Meta<typeof LongformArticleHero>;

export default meta;
type Story = StoryObj<LongformArticleHeroProps>;

export const Longform = {
  args: {
    title: 'Story title goes in here on multiple lines',
    tags: [
      {
        label: "Published",
        value: "15 January 2025",
        icon: "calendar-lines",
        iconStyle: "regular"
      },
      {
        label: "Read time",
        value: "15 minutes",
        icon: "clock",
        iconStyle: "regular"
      },
      {
        label: "Author",
        value: "Jane Doe",
        icon: "user",
        iconStyle: "solid"
      }
    ],
    description: "Plastic pollution presents a significant threat to our ocean. It endangers marine life, damages ecosystems, threatens human health and livelihoods and contributes to climate change.",
    background: {
      url: 'media/longform.jpg',
      alt: 'docks'
    },
    theme: '',
  }
} satisfies Story;

// export const LongformWithAnimationEnabled = {
//   args: {
//     ...Longform,
//     isAnimationsEnabled: true
//   }
// } satisfies Story;