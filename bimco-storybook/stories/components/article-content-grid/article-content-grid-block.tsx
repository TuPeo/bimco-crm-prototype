import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";

import { ContentGridBlock } from '../content-grid/content-grid-block';

export interface ArticleContentGridBlockProps {
  topDivider: boolean;
}

export const ArticleContentGridBlock = ({
  topDivider,
  children
}: PropsWithChildren<ArticleContentGridBlockProps>) => {
  return (
    <ContentGridBlock blockTypeModifier="article" theme="white" topDivider={topDivider}>
      {children}
    </ContentGridBlock>
  )
}