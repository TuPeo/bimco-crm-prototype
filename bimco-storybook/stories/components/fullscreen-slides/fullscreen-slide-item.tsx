import * as React from 'jsx-dom';
import ImageArgs from '../../types/image-args';

import './fullscreen-slide-item.scss';

export interface FullscreenSlideItemProps {
  title: string;
  number: string;
  description: string;
  backgroundImage: ImageArgs;
}

export const FullscreenSlideItem = ({
  title,
  number,
  description,
  backgroundImage
}: FullscreenSlideItemProps) => {
  return (
    <div class="fullscreen-slide-item swiper-slide">
      <picture>
        <img class="fullscreen-slide-item__image" src={backgroundImage.url} alt={backgroundImage.alt}></img>
      </picture>

      <div class="fullscreen-slide-item__container bimco-container bimco-container--inset-xxxl">
        <div class="row">
          <div class="col-md-8 col-lg-4">
            <div class="fullscreen-slide-item__content">
              <span class="fullscreen-slide-item__number">{number}</span>
              <h2 class="fullscreen-slide-item__title">{title}</h2>
              <p class="fullscreen-slide-item__description">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
