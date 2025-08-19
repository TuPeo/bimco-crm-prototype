import type { StoryObj, Meta } from '@storybook/html';
import { SocialLink, SocialLinkProps } from './social-link';

const meta = {
  title: 'Elements/Buttons/Social Link',
  tags: ['autodocs'],
  component: SocialLink,
  argTypes: {
    icon: {
      control: "text"
    }
  }
} satisfies Meta<typeof SocialLink>;

export default meta;
type Story = StoryObj<SocialLinkProps>;

export const SocialLinkLinkedIn: Story = {
  args: {
    icon: "linkedin-in",
    platformName: "LinkedIn"
  }
};

export const SocialLinkYoutube: Story = {
  args: {
    icon: "youtube",
    platformName: "Youtube"
  }
};

export const SocialLinkFacebook: Story = {
  args: {
    icon: "facebook-f",
    platformName: "Facebook"
  }
};

export const SocialLinkXTwitter: Story = {
  args: {
    icon: "x-twitter",
    platformName: "X formerly Twitter"
  }
};


