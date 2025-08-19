import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";
import ImageArgs from "../../types/image-args";
import { ThemeName } from "../../types/theme-name";
import { v4 as uuidV4 } from "uuid";

import "./longform-article-hero.scss";

interface LongformArticleHeroTagArgs {
  label: string;
  value: string;
  icon: string;
  iconStyle: string;
}

export interface LongformArticleHeroProps {
  title: string;
  background: ImageArgs;
  tags: LongformArticleHeroTagArgs[];
  description: string;
  theme: ThemeName;
  isAnimationsEnabled?: boolean;
}

export const LongformArticleHero = ({
  title,
  background,
  tags,
  description,
  theme
}: PropsWithChildren<LongformArticleHeroProps>) => {

  const cssClasses = ['longform-article-hero'];
  if (theme) {
    cssClasses.push(`theme--${theme}`);
    cssClasses.push('theme-zone');
  }

  return (
    <div 
      class={cssClasses}
      x-load
      x-data="longformArticleHero"
      data-scroll-trigger-block-id={uuidV4()}>

      <div class="longform-article-hero__inner">
        <div class="longform-article-hero__background" x-ref="longformArticleHeroBg">
          { background &&
            <picture>
              <img class="longform-article-hero__background-image" src={background.url} alt={background.alt} />
            </picture>
          }
          <div class="longform-article-hero__background-wash" x-ref="longformArticleHeroBgWash"></div>
        </div>

        <div class="longform-article-hero__header">
          <div class="bimco-container">
            <h1 class="longform-article-hero__title">{ title }</h1>
            <dl class="longform-article-hero__key-details">
              { tags.map(tag => 
                <div class="longform-article-hero__key-detail">
                  <dt class="longform-article-hero__key-detail-label">
                    <i class={`longform-article-hero__key-detail-icon fa-sharp fa-${tag.iconStyle} fa-${tag.icon}`} aria-hidden="true"></i>
                    <span class="visually-hidden">{ tag.label }</span>
                  </dt>
                  <dd class="longform-article-hero__key-detail-value">{ tag.value }</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>

      <div class="longform-article-hero__description-container bimco-container">
        <div class="longform-article-hero__description rich-text" x-ref="longformArticleHeroDesc">
          { description }
        </div>
      </div>
    </div>
  );
};
