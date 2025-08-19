import { Meta, StoryObj } from '@storybook/html';
import { ContactCard, ContactCardProps } from './contact-card';

const meta: Meta<ContactCardProps> = {
  title: 'Components/Cards/Contact Card',
  tags: ['autodocs'],
  component: ContactCard,
}

export default meta;
type Story = StoryObj<ContactCardProps>;

export const ContactCardDefault = {
  args: {
    image: { url: 'media/contact-card.png', alt: '' },
    name: 'Jane Doe',
    headline: 'Headline',
    subText: 'Company Name',
    email: 'email@domain.com',
    phoneNum: '+440000000000',
    bio: 'Information about this person'
  }
} satisfies Story;
