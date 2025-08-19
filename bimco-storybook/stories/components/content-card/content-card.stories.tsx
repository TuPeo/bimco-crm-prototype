import * as React from 'jsx-dom';
import { Meta, StoryObj } from '@storybook/html';
import { ContentCard, ContentCardProps } from './content-card';

const meta: Meta<ContentCardProps> = {
  title: 'Components/Cards/Content Card',
  tags: ['autodocs'],
  component: ContentCard,
}

export default meta;
type Story = StoryObj<ContentCardProps>;

export const ContentCardNoImage = {
  render: (args) => <ContentCard {...args} />,
  args: {
    displayImage: false,
    title: 'Liquid cargo of the month September 2024 - Resin oil, distilled lorem',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at sapien libero. Pellentesque cursus imperdiet nibh, nec facilisis tellus tempus at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at sapien libero. Pellentesque cursus imperdiet nibh, nec facilisis tellus tempus at.',
    metadata: {
      items: [
        { type: 'articletype', value: 'Insights' },
        { type: 'date', value: '05 Dec 2024' }
      ],
      contextClass: 'content-card__metadata'
    },
    link: { url: '#', label: 'Read more' }
  }
} satisfies Story;

export const ContentCardWithImage = {
  render: (args) => <ContentCard {...args} />,
  args: {
    image: { url: 'media/feature-cta-banner-inner.jpg', alt: '' },
    displayImage: true,
    title: 'Liquid cargo of the month September 2024 - Resin oil, distilled lorem',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at sapien libero. Pellentesque cursus imperdiet nibh, nec facilisis tellus tempus at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at sapien libero. Pellentesque cursus imperdiet nibh, nec facilisis tellus tempus at.',
    metadata: {
      items: [
        { type: 'articletype', value: 'Insights' },
        { type: 'date', value: '05 Dec 2024' }
      ],
      contextClass: 'content-card__metadata'
    },
    link: { url: '#', label: 'Read more' }
  }
} satisfies Story;

export const EventCardWithImage = {
  args: {
    image: { url: 'media/feature-cta-banner-inner.jpg', alt: '' },
    displayImage: true,
    imageOverlay: '01 Oct',
    title: 'Liquid cargo of the month September 2024 - Resin oil, distilled lorem',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at sapien libero. Pellentesque cursus imperdiet nibh, nec facilisis tellus tempus at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at sapien libero. Pellentesque cursus imperdiet nibh, nec facilisis tellus tempus at.',
    metadata: {
      items: [
        { type: 'articletype', value: 'Event' },
        { value: 'City, Country', type: 'location', iconStyle: 'solid', iconName: 'location-dot'}
      ],
      contextClass: 'content-card__metadata'
    },
    link: { url: '#', label: 'Read more' },
    hasOverlay: true,
    linkStyle: 'button'
  }
} satisfies Story;