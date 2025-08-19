import * as React from 'jsx-dom';
import { CategoryTag } from '../../elements/category-tag/category-tag';
import { CardMetaData, CardMetaDataProps } from '../card-metadata/card-metadata';

import './search-result-card.scss'

export interface SearchResultCardProps {
  title: string;
  description?: string;
  url: string;
  image?: string;
  imageAlt?: string;
  tag?: string;
  tagUrl?: string;
  metadata?: CardMetaDataProps;
}

export const SearchResultCard = ({
  title,
  description,
  url,
  image,
  imageAlt,
  tag,
  tagUrl,
  metadata
}: SearchResultCardProps) => {
  return <div class="search-result-card">
    <div class="search-result-card__main-col">
      { metadata && <CardMetaData {...metadata} /> }
      <h3 class="search-result-card__title">
        <a class="search-result-card__title-link" href={url}>{title}</a>
        <i class="search-result-card__title-arrow fa-sharp fa-regular fa-arrow-right" aria-hidden="true"></i>
      </h3>
      <div class="search-result-card__text">{description}</div>
      <div class="search-result-card__tag-row">
        <CategoryTag contextClass="search-result-card__tag" text={tag} href={tagUrl} />
      </div>
    </div>
    {image && <div class="search-result-card__image-col">
      <img class="search-result-card__image" src={image} alt={imageAlt} />
    </div>}
  </div>
};
