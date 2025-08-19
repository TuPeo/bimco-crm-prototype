import type { StoryObj, Meta } from '@storybook/html';
import { SmallImageAndText, SmallImageAndTextProps } from './small-image-and-text';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Text/Small Image & Text',
  tags: ['autodocs'],
  component: SmallImageAndText,
  argTypes: {
    text: {
      control: 'text',
    },
    theme: {
      control: 'select',
      options: ['', 'white', 'light', 'brand', 'dark']
    }
  }
} satisfies Meta<SmallImageAndTextProps>;

export default meta;
type Story = StoryObj;

export const SmallImageAndTextExample: Story = {
  args: {
    image: {
      url: "media/small-image-and-text.png",
      alt: "",
    },    
    text: "Our members cover 62% of the world's tonnage and consist of local, global, small, and large companies. We are an organisation and global shipping community of over 2,000 members in 130 countries. Together, we are the practical voice of shipping",
    theme: "brand"
  }
};

export const SmallImageAndTextWithBackgroundVideo: Story = {
  args: {
    image: {
      url: "media/small-image-and-text.png",
      alt: "",
    },
    text: "Our members cover 62% of the world's tonnage and consist of local, global, small, and large companies. We are an organisation and global shipping community of over 2,000 members in 130 countries. Together, we are the practical voice of shipping",
    theme: "brand",
    backgroundVideo: {
      url: "media/sea-animated-background.mp4",
      alt: "waves background",
    }
  }
};