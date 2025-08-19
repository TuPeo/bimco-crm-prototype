import * as React from "jsx-dom";
import "./testimonial-card.scss";

export interface TestimonialCardProps {
  imageSrc?: string;
  content?: string;
  name?: string;
  company?: string;
  theme?: "blue" | "orange" | "cyan" | "light-blue";
}

export const TestimonialCard = ({
  imageSrc,
  content,
  name,
  company,
  theme,
}: TestimonialCardProps) => {
  return (
    <div class={`testimonial-card testimonial-card--${theme}`}>
      <div class="testimonial-card__image-wrapper">
        <span class="testimonial-card__image-shape"></span>
        <img
          src={imageSrc}
          alt={`${name}'s picture`}
          class="testimonial-card__image"
        />
      </div>
      <div class="testimonial-card__content">
        <q class="testimonial-card__quote">{content}</q>
        <div class="testimonial-card__details">
          <strong class="testim]onial-card__name">— {name}</strong>
          <span class="testimonial-card__company">{company}</span>
        </div>
      </div>
    </div>
  );
};
