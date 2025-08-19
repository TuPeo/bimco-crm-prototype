import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";

import "./navigation-swiper.scss";

interface NavigationSwiperProps {
  slideCssClass?: string;
  contextClass?: string;
}

export const NavigationSwiper = ({
  slideCssClass = "swiper-slide", 
  contextClass, 
  children 
}: PropsWithChildren<NavigationSwiperProps>) => {
  return (
    <div class={`${contextClass} navigation-swiper swiper`}
    x-load 
    x-data={`navigationSwiper("${slideCssClass}")`}
    x-effect="handleResize($store.mediaQuery)">
      <div class="navigation-swiper__wrapper swiper-wrapper">
        {children}
      </div>
      <div class="navigation-swiper__pagination swiper-pagination" x-ref="pagination"></div>
    </div>
  )
}