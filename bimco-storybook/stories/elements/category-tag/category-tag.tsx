import * as React from "jsx-dom";
import "./category-tag.scss";

export interface CategoryTagProps {
  href?: string;
  contextClass?: string;
  text: string;
}

export const CategoryTag = ({ contextClass = "", href, text }: CategoryTagProps) => {
  const HtmlTag = href ? "a" : "span";

  return (
    <HtmlTag class={`category-tag ${contextClass} `} href={href}>
      { text }
    </HtmlTag>
  )
}