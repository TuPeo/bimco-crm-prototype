import * as React from 'jsx-dom';
import type { StoryObj, Meta } from '@storybook/html';
import { FullscreenSlides } from './fullscreen-slides'
import { FullscreenSlideItemProps } from './fullscreen-slide-item';

const slideItemsData: FullscreenSlideItemProps[] = [
  {
    title: 'Support and Facilitate Global Trade',
    number: '01',
    description: 'Ensuring efficient, fair, and safe shipping operations.',
    backgroundImage: {
      url: 'media/small-carousel-image.png',
      alt: ''
    }
  },
  {
    title: 'Innovative Technology',
    number: '02',
    description: 'Using advanced technology to enhance global trade.',
    backgroundImage: {
      url: 'media/hero-banner-lg.jpeg',
      alt: ''
    }
  },
  {
    title: 'Sustainable Shipping',
    number: '03',
    description: 'Commitment to reducing environmental impact.',
    backgroundImage: {
      url: 'media/feature-cta-banner-background-image.png',
      alt: ''
    }
  },
];

const meta = {
  title: 'Components/Carousels/Fullscreen Slides',
  component: FullscreenSlides,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    slideItems: {
      control: 'object',
    },
  },
} satisfies Meta<typeof FullscreenSlides>;

export default meta;
type Story = StoryObj<typeof FullscreenSlides>;

export const FullscreenSlidesExample: Story = {
  args: {
    intro: [
      <h2 class="headline-4">Our goal is to support a sustainable and efficient shipping industry</h2>,
      <p>And we do it by following these three guiding principles:</p>
    ],
    slideItems: slideItemsData,
  },
};
