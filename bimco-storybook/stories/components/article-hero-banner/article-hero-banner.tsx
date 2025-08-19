import * as React from "jsx-dom";
import ImageArgs from "../../types/image-args";

import "./article-hero-banner.scss";

interface DetailValue {
  label: string;
  value: string;
}

export interface ArticleHeroBannerProps {
  image?: ImageArgs;
  title?: string;
  topic?: string;
  keyDetails?: DetailValue[];
}

export const ArticleHeroBanner = ({ image, title, topic, keyDetails }: ArticleHeroBannerProps) => {
  return (
    <div class="article-hero-banner">
      {image && <div class="article-hero-banner__image-wrapper">
        <picture>
          <img class="article-hero-banner__image" src={image.url} alt={image.alt} />
        </picture>
      </div>}
      <div class="article-hero-banner__content">
        <div class="article-hero-banner__container bimco-container">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10">
              <span class="article-hero-banner__topic">{topic}</span>
              <h1 class="article-hero-banner__title">{title}</h1>

              <dl class="article-hero-banner__key-details">
                {keyDetails.map(keyDetail => (
                  <div class="article-hero-banner__key-detail">
                    <dt class="article-hero-banner__key-detail-label">
                      {keyDetail.label}
                    </dt>
                    <dd class="article-hero-banner__key-detail-value">
                      {keyDetail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}