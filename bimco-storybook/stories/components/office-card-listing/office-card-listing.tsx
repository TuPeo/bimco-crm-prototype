import * as React from "jsx-dom";
import "./office-card-listing.scss";
import { OfficeCard, OfficeCardProps } from "../../elements/office-card/office-card";

export interface OfficeCardListingProps {
  title: string;
  summary: string;
  cards: OfficeCardProps[];
}

export const OfficeCardListing = ({
  title,
  summary,
  cards
}: OfficeCardListingProps) => {
  return (
    <div class="office-card-listing">
      <div class="bimco-container bimco-container--inset-xxxl">
        <div class="office-card-listing__header row">
          <h2 class="office-card-listing__heading col-12 col-md-5 col-lg-6">
            {title}
          </h2>
          <div class="office-card-listing__description rich-text col-12 col-md-7 col-lg-6">
            <p>{summary}</p>
          </div>
        </div>
        <div class="office-card-listing__cards row">
          { cards.map(card => <div class="col-12 col-md-6">
            <OfficeCard { ...card } />
          </div>) }
        </div>
      </div>
    </div>
  );
}