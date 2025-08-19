import type { StoryObj, Meta } from '@storybook/html';
import { FeatureCtaBanner } from './feature-cta-banner';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/CTAs/Feature CTA Banner',
  tags: ['autodocs'],
  component: FeatureCtaBanner,
  argTypes: {
    theme: {
      control: 'select',
      options: ['', 'white', 'light', 'brand', 'dark']
    }
  }
} satisfies Meta<typeof FeatureCtaBanner>;

export default meta;
type Story = StoryObj;

export const FeatureCta: Story = {
  args: {
    title: 'Interested in what we have to offer?',
    description: 'Become a BIMCO member today to access exclusive resources and much more...',
    theme: '',
    backgroundImage: {
      url: 'media/feature-cta-banner-background-image.png',
      alt: ''
    },
    innerImage: {
      url: 'media/feature-cta-banner-inner.jpg',
      alt: 'ship on the sea'
    }
  }
};

export const FeatureCtaNoBackground: Story = {
  args: {
    title: 'Interested in what we have to offer?',
    description: 'Become a BIMCO member today to access exclusive resources and much more...',
    theme: '',
    innerImage: {
      url: 'media/feature-cta-banner-inner.jpg',
      alt: 'ship on the sea'
    }
  }
};