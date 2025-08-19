import * as React from "jsx-dom";
import "./trending-menu-card-item.scss";

export interface TrendingMenuCardItemProps {
  title: string;
  description: string;
  ranking?: string; // Optional ranking as a string to preserve leading zeroes
  variant?: "increasing" | "decreasing" | "neutral"; // Optional variant with default 'neutral'
}

export const TrendingMenuCardItem = ({
  title,
  description = "Description in here",
  ranking = "01", // Default ranking
  variant = "neutral", // Default variant
}: TrendingMenuCardItemProps) => {
  // Determine icon class based on the variant
  const iconClass = {
    increasing: "fa-sharp fa-regular fa-arrow-up-right-dots",
    decreasing: "fa-sharp fa-regular fa-arrow-up-right-dots decreasing",
    neutral: "fa-solid fa-minus",
  }[variant];

  return (
    <a className="trending-menu-card-item" href="#">
      <div className="trending-menu-card-item__container">
        {/* First row: Title and description */}
        <div className="trending-menu-card-item__row trending-menu-card-item__row--content">
          <div className="trending-menu-card-item__title">{title}</div>
          <div className="trending-menu-card-item__description">
            {description}
          </div>
        </div>

        {/* Second row: Ranking and icon */}
        <div className="trending-menu-card-item__row trending-menu-card-item__row--info">
          <div className="trending-menu-card-item__ranking">{ranking}</div>
          <i className={`trending-menu-card-item__icon ${iconClass}`} aria-hidden="true"></i>
        </div>
      </div>
    </a>
  );
};
