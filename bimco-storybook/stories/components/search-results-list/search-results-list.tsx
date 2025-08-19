import * as React from 'jsx-dom';
import { PropsWithChildren } from 'jsx-dom';

import './search-results-list.scss'

export interface SearchResultsListProps {
  noResultsMessage?: string;
}

export const SearchResultsList = ({
  noResultsMessage,
  children
}: PropsWithChildren<SearchResultsListProps>) => {
  return (
    <div class="search-results-list">
      <div class="search-results-list__container bimco-container bimco-container--inset-xxxl">
        <div class="search-results-list__search row">
          {noResultsMessage && <div class="no-results-message">
            <p>{noResultsMessage}</p>
          </div>}
          <div class="search-results-list__results-container col-md-10 col-lg-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
