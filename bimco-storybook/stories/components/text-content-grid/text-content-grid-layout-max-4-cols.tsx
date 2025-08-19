import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";

import { UmbBlockGridItem } from '../../layout/umb-block/umb-block-grid-item';

export interface TextContentGridLayoutMax4ColsProps {
  mainAreaItem: React.ReactElement;
}

export const TextContentGridLayoutMax4Cols = ({
  mainAreaItem, 
  children
}: PropsWithChildren<TextContentGridLayoutMax4ColsProps>) => {
  return (
    <UmbBlockGridItem typeAlias="textContentGridLayoutMax3Cols" colSpan={12} rowSpan={1}>
      <div 
        class="umb-block-grid__area-container"
        style="--umb-block-grid--area-grid-columns: 12;">
        <div
          class="umb-block-grid__area"
          data-area-col-span="7"
          data-area-row-span="1"
          data-area-alias="main"
          style="--umb-block-grid--grid-columns: 7; --umb-block-grid--area-column-span: 7; --umb-block-grid--area-row-span: 1;">
          <div class="umb-block-grid__layout-container">
            { mainAreaItem }
          </div>
        </div>
        <div class="umb-block-grid__area"
          data-area-col-span="12"
          data-area-row-span="1"
          data-area-alias="additional"
          style="--umb-block-grid--grid-columns: 12; --umb-block-grid--area-column-span: 12; --umb-block-grid--area-row-span: 1;">
          <div class="umb-block-grid__layout-container">
            {children}
          </div>
        </div>
      </div>
    </UmbBlockGridItem>
  )
}