import * as React from "jsx-dom";
import { CategoryTag } from "../category-tag/category-tag";
import { Button } from "../button/button";

import "../../components/generic-data-listing/generic-data-listing.scss";
import "./generic-data-listing-card.scss";

export interface GenericDataListingCardProps {
  title: string;
  description: string;
  date: string;
  icon?: string;
  iconText?: string;
  iconStyle?: "regular" | "solid";
  tag: string;
  tagContextClass?: string;
  linkText?: string;
  linkUrl?: string;
  linkIcon?: string;
  linkIconStyle?: "regular" | "solid";
}

export const GenericDataListingCard = ({
  title,
  description,
  date,
  icon,
  iconText,
  iconStyle = "regular",
  tag,
  tagContextClass,
  linkText,
  linkUrl,
  linkIcon,
  linkIconStyle = "regular",
}: GenericDataListingCardProps) => {
  const isFourColumns = !!linkText && !!linkUrl;

  return (
    <tr class="generic-data-listing-card">
      <td class="desc-col">
        <h3 class="generic-data-listing-card__title">
          <a class="generic-data-listing-card__title-link stretched-link" href="#">{title}</a>
        </h3>
        <div class="generic-data-listing-card__desc">{description}</div>
      </td>
      <td class="date-col">
        <span class="generic-data-listing-card__date">{date}</span>
        <span className="generic-data-listing-card__date-info">
          <i className={`generic-data-listing-card__date-info-icon fa-sharp fa-${icon} fa-${iconStyle}`} aria-hidden="true"></i>
          {iconText && (
            <span className="generic-data-listing-card__date-info-text">
              {iconText}
            </span>
          )}
        </span>
      </td>
      <td class="taxo-col">
        <CategoryTag text={tag} contextClass={tagContextClass} />
      </td>
      {isFourColumns && (
        <td class="link-col">
          <Button
            label={linkText}
            type="link"
            href={linkUrl}
            iconBefore={linkIcon}
            iconStyle={linkIconStyle} />
        </td>
      )}
    </tr>
  );
};
