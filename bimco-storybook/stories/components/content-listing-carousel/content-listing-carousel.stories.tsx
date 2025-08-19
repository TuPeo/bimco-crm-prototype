import * as React from "jsx-dom";
import type { Meta, StoryObj } from "@storybook/html";
import { ContentListingCarousel } from "./content-listing-carousel";
import { PreviewCard } from "../preview-card/preview-card";
import { BasicPreviewCard } from "../preview-card/preview-card.stories";
import { ContentCard } from "../content-card/content-card";
import { ContentCardWithImage } from "../content-card/content-card.stories";

const meta: Meta<typeof ContentListingCarousel> = {
  title: "Components/Carousels/Content Listing Carousel",
  component: ContentListingCarousel
};

export default meta;
type Story = StoryObj<typeof ContentListingCarousel>;

export const PreviewCards: Story = {
  render: (args) => (
    <div class="component-wrapper" style="position: relative; margin-top: 200px">
      <ContentListingCarousel {...args} />
    </div>
  ),
  args: {
    children: [
      <div class="content-listing-carousel__swiper-slide swiper-slide"><PreviewCard {...BasicPreviewCard.args} /></div>,
      <div class="content-listing-carousel__swiper-slide swiper-slide"><PreviewCard {...BasicPreviewCard.args} /></div>,
      <div class="content-listing-carousel__swiper-slide swiper-slide"><PreviewCard {...BasicPreviewCard.args} /></div>,
      <div class="content-listing-carousel__swiper-slide swiper-slide"><PreviewCard {...BasicPreviewCard.args} /></div>,
    ]
  }
};

export const ContentCards: Story = {
  render: (args) => (
    <div class="component-wrapper" style="position: relative; margin-top: 200px">
      <ContentListingCarousel {...args} />
    </div>
  ),
  args: {
    children: [
      <div class="content-listing-carousel__swiper-slide swiper-slide"><ContentCard {...ContentCardWithImage.args} /></div>,
      <div class="content-listing-carousel__swiper-slide swiper-slide"><ContentCard {...ContentCardWithImage.args} /></div>,
      <div class="content-listing-carousel__swiper-slide swiper-slide"><ContentCard {...ContentCardWithImage.args} /></div>,
      <div class="content-listing-carousel__swiper-slide swiper-slide"><ContentCard {...ContentCardWithImage.args} /></div>,
    ]
  }
};