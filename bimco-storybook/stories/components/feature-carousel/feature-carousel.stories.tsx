import * as React from 'jsx-dom';
import { Meta, StoryObj } from "@storybook/html";
import ImageArgs from '../../types/image-args';
import { FeatureCarouselProps, FeatureCarousel } from './feature-carousel';
import { ContentCardProps } from '../content-card/content-card';
import { CardMetaDataProps } from '../card-metadata/card-metadata';

const meta: Meta<FeatureCarouselProps> = {
  title: 'Components/Carousels/Feature Carousel',
  component: FeatureCarousel,
  parameters: {
    layout: 'fullscreen',
  }  
};

export default meta;
type Story = StoryObj<FeatureCarouselProps>;

const sampleImage: ImageArgs = {
  alt: 'Wind turbines at sunset',
  url: 'media/windfarm-ocean.png',
};

const sampleImage2: ImageArgs = {
  alt: 'Hero banner',
  url: 'media/hero-banner-lg.jpeg',
};

const sampleImage3: ImageArgs = {
  alt: 'News detail hero',
  url: 'media/news-detail-hero-banner.jpg',
};

const metadata: CardMetaDataProps = {
  items: [
    {
      value: 'Featured',
      type: 'articletype'
    },
    {
      value: '21 August 2024',
    },
  ],
  contextClass: 'content-card__metadata'
};

export const Default = {
  render: (args) => <FeatureCarousel {...args} />,
  args: {
    title: 'Trending Topics',
    items: [
      {
        image: sampleImage,
        displayImage: true,
        title: 'Liquid cargo of the month - Resin oil, distilled lorem',
        desc: 'The BIMCO Liquid Cargo database is intended for use by shore-side staff and to some extent by onboard crew.',
        metadata: metadata,
        link: { url: '#', label: 'Read more' }
      },
      {
        image: sampleImage2,
        displayImage: true,
        title: 'New updates to the shipping industry regulations',
        desc: 'The shipping industry is constantly evolving, and new regulations are in place to enhance safety and efficiency.',
        metadata: metadata,
        link: { url: '#', label: 'Read more' }
      },
      {
        image: sampleImage3,
        displayImage: true,
        title: 'Quarterly market insights for Q2 2024',
        desc: 'Get an in-depth look into the market trends for the second quarter of 2024, including cargo and shipping data.',
        metadata: metadata,
        link: { url: '#', label: 'Read more' }
      },
      {
        image: sampleImage,
        displayImage: true,
        title: 'Impact of fuel prices on the shipping industry',
        desc: 'An in-depth analysis of how rising fuel prices are affecting the global shipping industry.',
        metadata: metadata,
        link: { url: '#', label: 'Read more' }
      },
      {
        image: sampleImage3,
        displayImage: true,
        title: 'Annual Maritime Conference - Key Highlights',
        desc: 'A recap of the Annual Maritime Conference, covering the major discussions and outcomes.',
        metadata: metadata,
        link: { url: '#', label: 'Read more' }
      },
      {
        image: sampleImage2,
        displayImage: true,
        title: 'Enhancing on-board safety protocols for crew',
        desc: 'Best practices and new protocols to ensure crew safety while on-board.',
        metadata: metadata,
        link: { url: '#', label: 'Read more' }
      },
      {
        image: sampleImage3,
        displayImage: true,
        title: 'Advancements in maritime technology',
        desc: 'Exploring the latest technological advancements in the maritime industry.',
        metadata: metadata,
        link: { url: '#', label: 'Read more' }
      },
      {
        image: sampleImage,
        displayImage: true,
        title: 'Financial outlook for shipping companies in 2024',
        desc: 'A financial forecast and insights for shipping companies this year.',
        metadata: metadata,
        link: { url: '#', label: 'Read more' }
      },
    ] satisfies ContentCardProps[],
  }
} satisfies Story;
