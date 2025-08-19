import * as React from 'jsx-dom';
import type { Meta, StoryObj } from '@storybook/html';
import { ContactListingBlock, ContactListingBlockProps } from './contact-listing-block';
import { ContactCard } from '../contact-card/contact-card';
import { ContactCardDefault } from '../contact-card/contact-card.stories';

const meta: Meta<ContactListingBlockProps> = {
  title: 'Components/Listings/Contact Listing',
  tags: ['autodocs'],
  component: ContactListingBlock,
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
type Story = StoryObj<ContactListingBlockProps>;

const contactCardGridChildren = [
  <div class="contact-card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="contact-card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="contact-card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="contact-card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="contact-card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
  <div class="contact-card-grid__col"><ContactCard {...ContactCardDefault.args} /></div>,
]

export const ContactCardGrid: Story = {
  render: (args) => ContactListingBlock({...args, children: contactCardGridChildren}),
  args: {
    theme: 'dark',
    introText: 
    <>
      <h2>Senior team</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      </p>
    </>,
  }
}