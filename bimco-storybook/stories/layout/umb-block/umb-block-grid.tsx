import * as React from 'jsx-dom';
import { ReactNode } from 'jsx-dom';

export interface UmbBlockGridProps {
  children: ReactNode;
}

export const UmbBlockGrid = ({ children }: UmbBlockGridProps) => {
  return (
    <div class="umb-block-grid"
      data-grid-columns="12"
      style="--umb-block-grid--grid-columns: 12;">
      <div class="umb-block-grid__layout-container">
        { children }
      </div>
    </div>
  )
}