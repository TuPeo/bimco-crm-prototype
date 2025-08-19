import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";
import { Button } from "../../elements/button/button";

import "./content-listing-carousel.scss";

export const ContentListingCarousel = ({ children }: PropsWithChildren<object>) => {
  return (
    <div class="content-listing-carousel" x-load x-data="contentListingCarousel">
      <div class="content-listing-carousel swiper" x-ref="swiper">
        <div class="content-listing-carousel__swiper-wrapper swiper-wrapper row" x-bind:class="{ 'row': preInit }">
          {children}
        </div>
      </div>

      <div class="content-listing-carousel__controls">
        <Button type="icon-full" iconBefore="arrow-left" contextClass="content-listing-carousel__navigation-prev" title="Previous item" xRef="swiperPrev" />
        <Button type="icon-full" iconBefore="arrow-right" contextClass="content-listing-carousel__navigation-next" title="Next item" xRef="swiperNext" />
      </div>

      <div class="content-listing-carousel__pagination" x-ref="swiperPagination"></div>
    </div>
  )
}