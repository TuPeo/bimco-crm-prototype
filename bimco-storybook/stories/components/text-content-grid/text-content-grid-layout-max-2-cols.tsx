import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";

import { UmbBlockGridItem } from '../../layout/umb-block/umb-block-grid-item';

export interface TextContentGridLayoutMax2ColsProps {
  mainAreaItem: React.ReactElement;
}

export const TextContentGridLayoutMax2Cols = ({ 
  mainAreaItem, 
  children 
}: PropsWithChildren<TextContentGridLayoutMax2ColsProps>) => {
  return (
    <UmbBlockGridItem typeAlias="textContentGridLayoutMax2Cols" colSpan={12} rowSpan={1}>
      <div 
        class="umb-block-grid__area-container"
        style="--umb-block-grid--area-grid-columns: 12;">
        <div
          class="umb-block-grid__area"
          data-area-col-span="6"
          data-area-row-span="1"
          data-area-alias="main"
          style="--umb-block-grid--grid-columns: 6; --umb-block-grid--area-column-span: 6; --umb-block-grid--area-row-span: 1;">
          <div class="umb-block-grid__layout-container">
            { mainAreaItem }
          </div>
        </div>
        <div class="umb-block-grid__area"
          data-area-col-span="6"
          data-area-row-span="1"
          data-area-alias="additional"
          style="--umb-block-grid--grid-columns: 6; --umb-block-grid--area-column-span: 6; --umb-block-grid--area-row-span: 1;">
          <div class="umb-block-grid__layout-container">
            {children}
          </div>
        </div>
      </div>
    </UmbBlockGridItem>
  )
}