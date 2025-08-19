import * as React from "jsx-dom";
import "./large-card-carousel.scss";
import { TestimonialCard, TestimonialCardProps } from "../../elements/testimonial-card/testimonial-card";
import { LargeCardCta, LargeCardCtaProps } from "../../elements/large-card-cta/large-card-cta";

export interface LargeCardCarouselProps {
  title: string;
  description: string;
  cards: TestimonialCardProps[];
  ctaCard?: LargeCardCtaProps;
  theme: "light" | "white" | "dark" | "brand";
}

export const LargeCardCarousel = ({
  title,
  description,
  cards,
  ctaCard,
  theme,
}: LargeCardCarouselProps) => {
  const isNoSwiper = cards.length === 2;

  return (
    <div class={`large-card-carousel  theme-zone theme--${theme}`}>
    <div class="bimco-container">
    <div class="large-card-carousel__intro">
          <h2 class="large-card-carousel__title">{title}</h2>
          <p class="large-card-carousel__description">{description}</p>
        </div>
      <div
        class={`large-card-carousel__swiper swiper ${
          isNoSwiper ? "large-card-carousel__swiper--no-swiper" : ""
        }`}
        x-load
        x-data="largeCardCarousel()" // Use Alpine component
      >

        <div class="swiper-wrapper">
          {cards.map((card, index) => (
            <div class="swiper-slide" key={index}>
              <TestimonialCard {...card} />
            </div>
          ))}
          {ctaCard && (
            <div class="swiper-slide">
              <LargeCardCta
                title={ctaCard.title}
                description={ctaCard.description}
                ctaPrimaryLabel={ctaCard.ctaPrimaryLabel}
                ctaPrimaryUrl={ctaCard.ctaPrimaryUrl}
                ctaSecondaryLabel={ctaCard.ctaSecondaryLabel}
                ctaSecondaryUrl={ctaCard.ctaSecondaryUrl}
              />
            </div>
          )}
        </div>

        {!isNoSwiper && (
          <div class="large-card-carousel__scrollbar swiper-scrollbar"></div>
        )}
      </div>
    </div>
    </div>
  );
};
