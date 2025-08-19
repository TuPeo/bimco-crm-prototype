import * as React from 'jsx-dom';
import { GenericDataListingCard } from '../../elements/generic-data-listing-card/generic-data-listing-card';
import { ThreeColumns } from '../../elements/generic-data-listing-card/generic-data-listing-card.stories';
import { AlphabeticalIndex } from '../alphabetical-index/alphabetical-index';

import './generic-data-listing.scss';

export const GenericDataListing = ({}) => {
  return (
    <div class="generic-data-listing theme-zone theme--white">
      <div class="generic-data-listing__container bimco-container">
        <div class="generic-data-listing__search-loader row">
          <div class="generic-data-listing__sidebar col-lg-3">
            <div class="generic-data-listing__filters-container">
              {/* TODO: Filters */}
            </div>
          </div>

          <div class="generic-data-listing__results-container col-lg-9">
            <div class="generic-data-listing__index-col">
              <AlphabeticalIndex />
            </div>
            <div class="generic-data-listing__results-col">
            <table class="generic-data-listing__results generic-data-listing__results--3-cols">
              <thead class="generic-data-listing__results-header">
                <tr>
                  <th class="generic-data-listing__results-header-col desc-col" scope="col">Contract Name</th>
                  <th class="generic-data-listing__results-header-col date-col" scope="col">Published Date</th>
                  <th class="generic-data-listing__results-header-col taxo-col" scope="col">Tags</th>
                </tr>
              </thead>
              <tbody class="generic-data-listing__results-body">
                <GenericDataListingCard {...ThreeColumns.args}/>
                <GenericDataListingCard {...ThreeColumns.args}/>
                <GenericDataListingCard {...ThreeColumns.args}/>
                <GenericDataListingCard {...ThreeColumns.args}/>
                <GenericDataListingCard {...ThreeColumns.args}/>
                <GenericDataListingCard {...ThreeColumns.args}/>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
      <div class="generic-data-listing__footer">
        {/* TODO: Footer contents */}
      </div>
    </div>
  )
}