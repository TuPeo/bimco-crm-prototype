import * as React from 'jsx-dom';
import { ReactNode } from 'jsx-dom';

export interface UmbBlockGridItemProps {
  typeAlias: string;
  colSpan: number;
  rowSpan: number;
  children: ReactNode;
}

export const UmbBlockGridItem = ({ typeAlias, colSpan, rowSpan, children }: UmbBlockGridItemProps) => {
  return (
    <div
      class="umb-block-grid__layout-item"
      data-content-element-type-alias={typeAlias}
      data-col-span={colSpan}
      data-row-span={rowSpan}
      style={`--umb-block-grid--item-column-span: ${colSpan}; --umb-block-grid--item-row-span: ${rowSpan};`}>
      { children }
    </div>
  )
}