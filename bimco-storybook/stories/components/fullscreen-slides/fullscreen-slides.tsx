import * as React from 'jsx-dom';
import { ReactNode } from 'jsx-dom';
import { FullscreenSlideItem, FullscreenSlideItemProps } from './fullscreen-slide-item';

import './fullscreen-slides.scss';

export interface FullscreenSlideProps {
  intro: ReactNode;
  slideItems: FullscreenSlideItemProps[];
}

export const FullscreenSlides = ({ intro, slideItems = [] }: FullscreenSlideProps) => {
  return (
    <div class="fullscreen-slides"
      x-load
      x-data="fullscreenSlides">

      {intro &&
        <div class="fullscreen-slides__intro-container bimco-container bimco-container--inset-xxxl">
          <div class="row">
            <div class="rich-text col-md-10 col-lg-6">
              {intro}
            </div>
          </div>
        </div>
      }

      <div class="fullscreen-slides__swiper swiper" x-ref="swiper">
        <div class="fullscreen-slides__wrapper swiper-wrapper">
          {slideItems.map(item =>
            <FullscreenSlideItem {...item} />
          )}
        </div>

        <div class="fullscreen-slides__pagination-wrapper">
          <div class="bimco-container bimco-container--inset-xxxl">
            <div class="row">
              <div class="col-md-8 col-lg-4 col-xxxl-4">
                <div class="fullscreen-slides__pagination swiper-pagination" x-ref="swiperPagination"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
