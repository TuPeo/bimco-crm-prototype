import * as React from 'jsx-dom';
import ImageArgs from '../../types/image-args';
import { ButtonGroup } from '../../elements/button-group/button-group';
import { Button } from '../../elements/button/button';
import "./feature-cta-banner.scss";


export interface FeatureCtaBannerProps {
  backgroundImage?: ImageArgs;
  innerImage: ImageArgs;
  title: string;
  description: string;
  theme: ['' | 'white' | 'light' | 'brand' | 'dark'];
}

export const FeatureCtaBanner = ({
  backgroundImage,
  innerImage,
  title,
  description,
  theme,
}: FeatureCtaBannerProps) => {
  const themeClasses = theme && `theme-zone theme--${theme}`;

  return (
    <div class={`feature-cta-banner ${themeClasses}`}>
      {backgroundImage &&
        <picture>
          <img class="feature-cta-banner__background-image" src={backgroundImage.url} alt={backgroundImage.alt} />
        </picture>
      }

      <div class="feature-cta-banner__container bimco-container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-xxxl-8">
            <div class={`feature-cta-banner__inner ${!backgroundImage ? "theme-inverse-alt" : ""}`}>
              <div class="feature-cta-banner__inner-content">
                <h2 class="feature-cta-banner__title headline-3">{title}</h2>
                <p class="feature-cta-banner__description">{description}</p>

                <ButtonGroup autoWidthBreakpoint="lg">
                  <Button type="primary" label="Sign up"/>
                  <Button type="secondary" label="Learn more"/>
                </ButtonGroup>
              </div>

              {innerImage &&
                <div class="feature-cta-banner__inner-image-wrapper">
                  <picture>
                    <img class="feature-cta-banner__inner-image" src={innerImage.url} alt={innerImage.alt} />
                  </picture>

                  <span class="feature-cta-banner__image-wash"></span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
