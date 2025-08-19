import type { StoryObj, Meta } from '@storybook/html';

import { ArticleHeroBanner } from "./article-hero-banner";

const meta: Meta<typeof ArticleHeroBanner> = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    image: {
      url: "media/news-detail-hero-banner.jpg",
      alt: ""
    },
    title: "News title goes in here across multiple lines as needed",
    topic: "Topic goes here",
    keyDetails: [
      {
        label: "Published",
        value: "Date goes in here"
      },
      {
        label: "Author",
        value: "Christian Hoppe"
      }
    ]
  },
  title: 'Components/Hero Banners/Article Hero Banner',
  tags: ['autodocs'],
  component: ArticleHeroBanner
}

export default meta;
type Story = StoryObj<typeof ArticleHeroBanner>;

export const NewsAndInsights: Story = {
  args: {
    ...meta.args,
  }
}