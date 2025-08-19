import * as React from "jsx-dom";
import { Button, ButtonProps } from "../../elements/button/button";
import ImageArgs from "../../types/image-args";
import { ReusableCard } from "../../elements/reusable-card/reusable-card";
import { NewsNoImage } from "../../elements/reusable-card/reusable-card.stories";
import { CardGrid } from "../card-grid/card-grid";

import "./spotlight-component.scss";

export interface SpotlightComponentProps {
  title: string;
  description: string;
  tagText: string;
  image: ImageArgs;
  callToAction: ButtonProps;
  cardsTitle: string;
}

export const SpotlightComponent = ({
  title, 
  description, 
  tagText, 
  image, 
  callToAction, 
  cardsTitle 
}: SpotlightComponentProps) => {
  return (
    <div class="spotlight-component">
      <div class="bimco-container bimco-container--inset-xxxl">
        <div class="spotlight-component__container-inner">
          <div class="spotlight-component__image-wrapper">
            {image && 
              <picture>
                <img class="spotlight-component__image" src={image.url} alt={image.alt}></img>
              </picture>}
          </div>

          <div class="spotlight-component__top-row">
            <div class="spotlight-component__content-col">
              <h2 class="spotlight-component__heading">
                <span class="spotlight-component__heading-eyebrow">{tagText}</span>
                <span class="spotlight-component__heading-text">{title}</span>
              </h2>
              {description && <p class="spotlight-component__description">{description}</p>}
              <Button {...callToAction} />
            </div>
          </div>

          <div class="spotlight-component__bottom-row">
            <div class="spotlight-component__cards-col">
              <h3 class="spotlight-component__cards-heading">{cardsTitle}</h3>
              <div class="spotlight-component__cards theme-zone theme--brand">
                <CardGrid cardType="content">
                  <div class="content-card-grid__col">
                    <ReusableCard {...NewsNoImage.args} />
                  </div>
                  <div class="content-card-grid__col">
                    <ReusableCard {...NewsNoImage.args} />
                  </div>
                </CardGrid>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}