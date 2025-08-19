import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";

import { UmbBlockGridItem } from '../../layout/umb-block/umb-block-grid-item';
import { ArticleText } from './article-text';

export interface ArticleBodyTextGridItemProps {
  colSpan: 6 | 8;
}

export const ArticleBodyTextGridItem = ({
  colSpan, 
  children
}: PropsWithChildren<ArticleBodyTextGridItemProps>) => {
  return (
    <UmbBlockGridItem typeAlias="articleBodyTextBlock" colSpan={colSpan} rowSpan={1}>
      { ArticleText({children: children}) }
    </UmbBlockGridItem>
  )
}