import * as React from "jsx-dom";
import "./related-tags.scss";
import { CategoryTag } from "../../elements/category-tag/category-tag";

export interface RelatedTagsProps {
  tags?: Array<{
    text: string;
  }>;
}

export const RelatedTags = ({ tags }: RelatedTagsProps) => {
  return (
    <div class="related-tags">
      <h2 class="related-tags__heading">Explore Related Topics</h2>
      <div class="related-tags__list">
        {tags && tags.map((tag) => (
          <CategoryTag contextClass="related-tags__item" text={tag.text} />
        ))}
      </div>
    </div>
  );
};
