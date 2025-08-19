import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";

import { UmbBlockGridItem } from '../../layout/umb-block/umb-block-grid-item';
import { ArticleText } from './article-text';

export interface ArticleAbstractGridItemProps {
  colSpan: 6 | 8;
}

export const ArticleAbstractGridItem = ({
  colSpan, 
  children
}: PropsWithChildren<ArticleAbstractGridItemProps>) => {
  return (
    <UmbBlockGridItem typeAlias="articleAbstractBlock" colSpan={colSpan} rowSpan={1}>
      { ArticleText({children: children}) }
    </UmbBlockGridItem>
  )
}