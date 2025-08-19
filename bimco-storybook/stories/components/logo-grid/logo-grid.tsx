import * as React from "jsx-dom";
import ImageArgs from "../../types/image-args";

import "./logo-grid.scss";

export interface LogoGridProps {
  logos: ImageArgs[];
  variant: "grid" | "carousel";
}

export const LogoGrid = ({ logos, variant }: LogoGridProps) => {
  const isCarousel = variant === "carousel" && logos.length > 6;
  return (
    <div class="logo-grid">
      {isCarousel &&
        <div class="logo-grid__swiper logo-grid__swiper--hidden swiper"
          x-load 
          x-data="logoCarousel" 
          x-bind:class="{ 'logo-grid__swiper--hidden' : !swiperInit }">

          <div class="swiper-wrapper">
            {logos && logos.map(logo => (
              <div class="swiper-slide">
                <div class="logo-grid__card">
                  <img class="logo-grid__logo-image" src={logo.url} alt={logo.alt} />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      {!isCarousel &&
        <div class={ `logo-grid__grid logo-grid__grid--${logos.length}-items` }>
          {logos && logos.map(logo => (
            <div class="logo-grid__card">
              <img class="logo-grid__logo-image" src={logo.url} alt={logo.alt} />
            </div>
          ))}
        </div>
      }
    </div>
  )
}