import * as React from 'jsx-dom';
import { PropsWithChildren } from 'jsx-dom';
import { ThemeName } from '../../types/theme-name';
import LinkArgs from '../../types/link-args';
import { Button } from '../../elements/button/button';
import { CardGrid } from '../card-grid/card-grid';

import './content-listing.scss';

export interface ContentListingBlockProps {
  theme: ThemeName;
  heading: string;
  listingPageLink?: LinkArgs | null;
  listingPageTeaserText: string;
}

export const ContentListingBlock = ({
  theme = 'dark',
  heading,
  listingPageLink,
  listingPageTeaserText,
  children
}: PropsWithChildren<ContentListingBlockProps>) => {
  return (
    <div className={`content-listing theme-zone theme--${theme}`}>

        <div class="content-listing__container bimco-container bimco-container--inset-xxxl">
            <div class="content-listing__header">
                <h2 class="content-listing__heading">{ heading }</h2>
                {listingPageLink && <Button
                  type="link"
                  contextClass="content-listing__header-link"
                  href={listingPageLink.url}
                  label={listingPageLink.label} />}
            </div>

            <div class="content-listing__results-wrapper">
              <CardGrid cardType="content">
                { children }
              </CardGrid>

              {(listingPageLink && listingPageTeaserText) && <div class="content-listing__teaser">
                <Button
                  type="primary"
                  contextClass="content-listing__teaser-btn"
                  href={listingPageLink.url}
                  label={listingPageTeaserText} />
              </div>}
            </div>
        </div>
    </div>
  );
}
