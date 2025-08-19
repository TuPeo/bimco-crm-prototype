import * as React from "jsx-dom";
import type { Meta, StoryObj } from "@storybook/html";
import { VideoCarousel, VideoCarouselProps } from "./video-carousel";

const meta: Meta<typeof VideoCarousel> = {
  title: "Components/Carousels/Video Carousel",
  component: VideoCarousel,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<VideoCarouselProps>;

export const Base: Story = {
  render: (args) => <div style="height: 100vh">
      {VideoCarousel({ ...args })}
    </div>,
  args: {
    videos: [
      {
        title: "ship recycling",
        subtitle: "Time for change",
        url: "https://into-the-program.com/uploads/sample_video01.mp4",
        thumbnail: {
          url: "media/city.jpg",
          alt: "City"
        }
      },
      {
        title: "ship recycling",
        subtitle: "Time for change",
        url: "https://into-the-program.com/uploads/sample_video02.mp4",
        thumbnail: {
          url: "media/hero-shot0.png",
          alt: "City"
        }
      },
      {
        title: "ship recycling",
        subtitle: "Time for change",
        url: "https://into-the-program.com/uploads/sample_video03.mp4",
        thumbnail: {
          url: "media/longform.jpg",
          alt: "City"
        }
      }
    ]
  }
};