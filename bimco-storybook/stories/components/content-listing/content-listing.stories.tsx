import * as React from 'jsx-dom';
import type { Meta, StoryObj } from '@storybook/html';
import { ContentListingBlock, ContentListingBlockProps } from './content-listing-block';
import { ContentCard } from '../content-card/content-card';
import { ContentCardWithImage, EventCardWithImage } from '../content-card/content-card.stories';
import { ContactCard } from '../contact-card/contact-card';
import { ContactCardDefault } from '../contact-card/contact-card.stories';

const meta: Meta<ContentListingBlockProps> = {
  title: 'Components/Listings/Content Listing',
  tags: ['autodocs'],
  component: ContentListingBlock,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    theme: {
      control: {
        type: 'select'
      },
      options: ['white', 'light', 'brand', 'dark']
    }
  }
}

export default meta;
type Story = StoryObj<ContentListingBlockProps>;

const contentCardGridChildren = [
  <div class="content-card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>
]

const contentCardGridChildrenEvents = [
  <div class="content-card-grid__col"><ContentCard {...EventCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...EventCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...EventCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...EventCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...EventCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...EventCardWithImage.args} /></div>
]

const contactCardGridChildren = [
  <div class="content-card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="content-card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="content-card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="content-card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="content-card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="content-card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
]

export const ContactCardGridNoTeaser: Story = {
  render: (args) => ContentListingBlock({...args, children: contactCardGridChildren}),
  args: {
    theme: 'dark',
    heading: 'Content listing',
    listingPageLink: { label: 'Browse all', url: '#' }
  }
}

export const ContentCardGridNoTeaser: Story = {
  render: (args) => ContentListingBlock({...args, children: contentCardGridChildren}),
  args: {
    theme: 'dark',
    heading: 'Content listing',
    listingPageLink: { label: 'Browse all', url: '#' }
  }
}

export const ContentCardEvents: Story = {
  render: (args) => ContentListingBlock({...args, children: contentCardGridChildrenEvents}),
  args: {
    theme: 'dark',
    heading: 'Content listing',
    listingPageLink: { label: 'Browse all', url: '#' },
  }
}
