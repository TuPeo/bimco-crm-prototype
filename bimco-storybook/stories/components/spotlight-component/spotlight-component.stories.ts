import type { StoryObj, Meta } from '@storybook/html';
import { SpotlightComponent, SpotlightComponentProps } from './spotlight-component';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Listings/Spotlight Component',
  tags: ['autodocs'],
  component: SpotlightComponent,
} satisfies Meta<SpotlightComponentProps>;

export default meta;
type Story = StoryObj<SpotlightComponentProps>;

export const Default = {
  args: {
    title: "An introduction to the BIMCO Holiday Calendar",
    description: "Holidays play a fundamental part in shipping. Not only are holidays instrumental in determining if overtime rates have to be paid to stevedores or other port services, but in many charter parties, holidays are excepted from laytime.",
    tagText: "Spotlight",
    callToAction: {
      type: "secondary",
      label: "Read more",
      href: "#"
    },
    image: {
      url: "media/spotlight.png",
      alt: "waves background",
    },
    cardsTitle: "More on this topic"
  }
} satisfies Story;