import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";
import "./grid-listing.scss";
import LinkArgs from "../../types/link-args";
import { Button } from "../../elements/button/button";

export interface GridListingArgs {
  title: string;
  link: string;
  teaserLink: LinkArgs;
}

export const GridListing = ({
  title,
  link,
  teaserLink,
  children
}: PropsWithChildren<GridListingArgs>) => {
  return <div class="grid-listing">
    { ( title || link ) &&    
      <div class="grid-listing__header">
        { title && 
          <h4 class="grid-listing__title">{ title }</h4>
        }
        { link &&        
          <Button type="link" label={ link }/>
        }
      </div>
    }
    <div class="grid-listing__items">
      {children}
      { teaserLink &&
        <>
          <span class="grid-listing__teaser-card"></span>
          <span class="grid-listing__teaser-card"></span>
          <span class="grid-listing__teaser-card"></span>
        </>
      }
    </div>
    { teaserLink &&
      <>
        <div class="grid-listing__teaser-link">
          <Button type="primary" label={ teaserLink.label } href={ teaserLink.url } />
        </div>
        <span class="grid-listing__teaser-gradient"></span>
      </>
    }
  </div>
}