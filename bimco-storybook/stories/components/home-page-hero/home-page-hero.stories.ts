import type { StoryObj, Meta } from '@storybook/html';
import { HomePageHero } from './home-page-hero';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Hero Banners/Home Page Hero',
  tags: ['autodocs'],
  component: HomePageHero
} satisfies Meta<typeof HomePageHero>;

export default meta;
type Story = StoryObj;

export const HomePage: Story = {
  args: {
    title: 'Practical voice of shipping',
    description: 'We offer clear standards, resources and training for the global maritime community',
    background: {
      url: 'media/hero-banner-lg.jpeg',
      alt: 'ship on the sea'
    }
  }
};