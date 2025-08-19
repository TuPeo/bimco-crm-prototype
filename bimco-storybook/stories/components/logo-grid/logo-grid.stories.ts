import type { StoryObj, Meta } from '@storybook/html';

import { LogoGrid, LogoGridProps } from "./logo-grid";
import ImageArgs from '../../types/image-args';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Carousels/Logo Grid',
  tags: ['autodocs'],
  component: LogoGrid
} satisfies Meta<LogoGridProps>;

export default meta;
type Story = StoryObj<LogoGridProps>;

const DefaultLogo: ImageArgs = {
  url: "media/cosco-shipping.png",
  alt: "cosco shipping"
}

const LogoArray = (num: number = 9): ImageArgs[] => Array(num).fill(DefaultLogo);

export const Grid = {
  args: {
    variant: "grid",
    logos: LogoArray(9)
  }
} satisfies Story;

export const Carousel = {
  args: {
    variant: "carousel",
    logos: LogoArray(14)
  }
} satisfies Story;