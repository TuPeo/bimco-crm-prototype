import * as React from "jsx-dom";
import { CategoryTag } from "../category-tag/category-tag";

import "./recommended-search-result.scss";

interface RecommendedSearchResultProps {
  title: string;
  description: string;
  tag: string;
}

export const RecommendedSearchResult = ({ title, description, tag }: RecommendedSearchResultProps) => {
  return (
    <a class="recommended-search-result" href="/">
      <span class="recommended-search-result__title">{title}</span>
      <div class="recommended-search-result__bottom">
        <CategoryTag contextClass="recommended-search-result__tag" text={tag} />
        <span class="recommended-search-result__description">{description}</span>
      </div>
    </a>
  )
}