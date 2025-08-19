import * as React from 'jsx-dom';
import type { Meta, StoryObj } from '@storybook/html';
import { CardGrid, CardGridProps } from './card-grid';
import { PreviewCard } from '../preview-card/preview-card';
import { BasicPreviewCard } from '../preview-card/preview-card.stories';
import { ContentCard } from '../content-card/content-card';
import { ContentCardNoImage, ContentCardWithImage } from '../content-card/content-card.stories';
import { ContactCard } from '../contact-card/contact-card';
import { ContactCardDefault } from '../contact-card/contact-card.stories';

const meta: Meta<CardGridProps> = {
  title: 'Components/Cards/Card Grid',
  tags: ['autodocs'],
  component: CardGrid,
  argTypes: {
    cardType: {
      control: {
        type: 'select'
      },
      options: ['preview', 'content', 'contact']
    }
  }
}

export default meta;
type Story = StoryObj<CardGridProps>;

const previewCards = [
  <div class="card-grid__col"><PreviewCard {...BasicPreviewCard.args} /></div>,
  <div class="card-grid__col"><PreviewCard {...BasicPreviewCard.args} /></div>,
  <div class="card-grid__col"><PreviewCard {...BasicPreviewCard.args} /></div>,
  <div class="card-grid__col"><PreviewCard {...BasicPreviewCard.args} /></div>,
  <div class="card-grid__col"><PreviewCard {...BasicPreviewCard.args} /></div>
]

const contentCardsNoImage = [
  <div class="card-grid__col"><ContentCard {...ContentCardNoImage.args} /></div>,
  <div class="card-grid__col"><ContentCard {...ContentCardNoImage.args} /></div>,
  <div class="card-grid__col"><ContentCard {...ContentCardNoImage.args} /></div>,
  <div class="card-grid__col"><ContentCard {...ContentCardNoImage.args} /></div>,
  <div class="card-grid__col"><ContentCard {...ContentCardNoImage.args} /></div>
]

const contentCardsWithImage = [
  <div class="card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>
]

const contactCards = [
  <div class="card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>
]

export const PreviewCards: Story = {
  render: (args) => CardGrid({...args, children: previewCards}),
  args: {
    cardType: 'preview'
  }
}

export const ContentCardsNoImage: Story = {
  render: (args) => CardGrid({...args, children: contentCardsNoImage}),
  args: {
    cardType: 'content'
  }
}

export const ContentCardsWithImage: Story = {
  render: (args) => CardGrid({...args, children: contentCardsWithImage}),
  args: {
    cardType: 'content'
  }
}

export const ContactCards: Story = {
  render: (args) => CardGrid({...args, children: contactCards}),
  args: {
    cardType: 'contact'
  }
}
