import type { StoryObj, Meta } from '@storybook/html';
import { PinnedLinks, PinnedLinksArgs } from "./pinned-links";

const meta: Meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Members/Pinned Links',
  tags: ['autodocs'],
  component: PinnedLinks
};

export default meta;
type Story = StoryObj<PinnedLinksArgs>;

export const Default: Story = {
  args: {
    links: [
      {
        url: "/",
        label: "Lorem ipsum"
      },
      {
        url: "/",
        label: "Lorem ipsum dolor sit amet"
      },
      {
        url: "/",
        label: "Lorem ipsum"
      },
      {
        url: "/",
        label: "Lorem ipsum 2012"
      },
      {
        url: "/",
        label: "Lorem ipsum dolor sit amet"
      },
      {
        url: "/",
        label: "Lorem ipsum dolor sit amet"
      },
      {
        url: "/",
        label: "Lorem ipsum 2012"
      },
      {
        url: "/",
        label: "Lorem ipsum"
      }
    ]
  }
};
