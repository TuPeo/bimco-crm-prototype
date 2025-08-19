import * as React from 'jsx-dom';
import { PaginationModel } from './pagination.model';

import './pagination.scss';

export interface PaginationProps {
  selectedPage: number;
  maxShown: number;
  pageCount: number;
}

export const Pagination = ({
  selectedPage,
  maxShown,
  pageCount
}: PaginationProps) => {

  const pagination = new PaginationModel(() => { });
  pagination.update({
    pageNumber: selectedPage - 1,
    pageSize: 12,
    itemsCount: pageCount * 12,
    maxPages: maxShown
  });

  return (
    <ul class="pagination">
      {pagination.pages.map(page => 
        <li class="pagination__page">
          {page.showLastGapMarker && <span class="pagination__last-gap-marker"></span>}
          <a class={`btn btn-secondary ${page.isSelected && 'btn--highlighted'}`} href={page.href}>
            <span class="btn__content btn-content--initial">{page.pageNumber}</span>
          </a>
          {page.showFirstGapMarker && <span class="pagination__first-gap-marker"></span>}
        </li>
      )}
    </ul>
  );
};