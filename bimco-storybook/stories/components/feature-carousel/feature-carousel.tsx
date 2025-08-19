import * as React from "jsx-dom";
import "./feature-carousel.scss";
import {
  ContentCard,
  ContentCardProps,
} from "../content-card/content-card";
import { Button } from "../../elements/button/button";

export interface FeatureCarouselProps {
  items: ContentCardProps[];
  title?: string;
}

export const FeatureCarousel = ({
  items,
  title = "Trending Topics",
}: FeatureCarouselProps) => {
  return (
    <div class="feature-carousel"
      x-load
      x-data="featureCarousel">

      <div class="feature-carousel__container bimco-container bimco-container--inset-xxxl">
        <div class="feature-carousel__header">
          <span class="feature-carousel__indicator feature-carousel__indicator--first" aria-hidden="true">(01)</span>
          <h2 class="feature-carousel__heading">{title}</h2>
          <span class="feature-carousel__indicator feature-carousel__indicator--last" aria-hidden="true">(0{items.length})</span>
        </div>

        <div class="feature-carousel__swiper feature-carousel__swiper--hidden"
          x-bind:style="{ height: swiperHeight }"
          x-ref="swiper">

          <div class="feature-carousel__swiper-wrapper swiper-wrapper row" x-bind:class="{ 'row': preInit }">
            {items.map(item => (
              <div className="feature-carousel__swiper-slide swiper-slide">
                <ContentCard {...item} />
              </div>
            ))}
          </div>
        </div>

        <div class="feature-carousel__controls">
          <Button
            label=""
            type="icon-subtle"
            iconBefore="arrow-left"
            contextClass="feature-carousel__btn feature-carousel__btn--prev"
            xRef="swiperPrev">
          </Button>
          <Button
            label=""
            type="icon-subtle"
            iconBefore="arrow-right"
            contextClass="feature-carousel__btn feature-carousel__btn--next"
            xRef="swiperNext">
          </Button>
        </div>

        <div class="feature-carousel__scrollbar swiper-scrollbar" x-ref="swiperScrollbar"></div>
      </div>
    </div>
  );
};
