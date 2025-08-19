import * as React from 'jsx-dom';
import { PropsWithChildren } from 'jsx-dom';
import { ThemeName } from '../../types/theme-name';
import { CardGrid } from '../card-grid/card-grid';

import './contact-listing.scss';

export interface ContactListingBlockProps {
  theme: ThemeName;
  introText: React.ReactNode;
}

export const ContactListingBlock = ({
  theme = 'light',
  introText,
  children
}: PropsWithChildren<ContactListingBlockProps>) => {
  return (
    <div class={`contact-listing theme-zone theme--${theme}`}>
      <div class="contact-listing__container bimco-container bimco-container--inset-xxxl">
        <div class="row">
          <div class="contact-listing__intro col-md-9 col-lg-5">
            {introText}
          </div>
        </div>

        <div class="contact-listing__results-wrapper">
          <CardGrid cardType="contact">
            {children}
          </CardGrid>
        </div>
      </div>
    </div>
  );
}
