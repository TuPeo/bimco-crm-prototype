import * as React from "jsx-dom";
import ImageArgs from "../../types/image-args";

import "./video-carousel.scss";
import { Button } from "../../elements/button/button";

export interface VideoCarouselCardProps {
  title: string;
  subtitle: string;
  url: string;
  thumbnail: ImageArgs;
}

export interface VideoCarouselProps {
  videos: VideoCarouselCardProps[];
}

export const VideoCarousel = ({
  videos
}: VideoCarouselProps) => {
  return (
    <div
      class="video-carousel theme-zone theme--dark"
      x-load
      x-data="videoCarousel">
      <div class="bimco-container">
        <div class="video-carousel__content-wrapper">
          <div class="video-carousel__swiper swiper" x-ref="swiper">
            <div class="swiper-wrapper">
              {videos && videos.map((video, index) =>
                <div key={index} class="swiper-slide">
                  <div class="video-carousel__slide-thumbnail"><img src={video.thumbnail.url} alt={video.thumbnail.alt} /></div>
                  <div class="video-carousel__video-wrapper">
                    <video class="video-carousel__video" src={video.url} preload="metadata"></video>
                    <div class="video-carousel__play-container">
                      <div class="video-carousel__slide-button-container">
                        <Button contextClass="video-carousel__play-button" type="icon-subtle" iconBefore="circle-play" iconStyle="solid" ariaLabel="Play" />
                        <Button contextClass="video-carousel__pause-button" type="icon-subtle" iconBefore="circle-pause" iconStyle="solid" ariaLabel="Pause" />
                      </div>
                      <div class="video-carousel__slide-title-container">
                        <h4 class="video-carousel__slide-eyebrow">
                          {video.title}
                        </h4>
                        <h5 class="video-carousel__slide-title">
                          {video.subtitle}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="video-carousel__middle">
                    <div class="video-carousel__middle-title-container">
                      <h4 class="video-carousel__slide-eyebrow">
                      {video.title}
                      </h4>
                      <h5 class="video-carousel__slide-title">
                      {video.subtitle}
                      </h5>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div class="video-carousel__bottom">
            <div class="video-carousel__navigation-wrapper">
              <Button type="icon-subtle" iconBefore="chevron-left" contextClass="video-carousel__navigation-prev" title="Previous video" xRef="prevEl" />
              <Button type="icon-subtle" iconBefore="chevron-right" contextClass="video-carousel__navigation-next" title="Next video" xRef="nextEl" />
            </div>
            <div class="video-carousel__pagination swiper-pagination" x-ref="pagination"></div>
          </div>
        </div>
      </div>
    </div>
  )
}