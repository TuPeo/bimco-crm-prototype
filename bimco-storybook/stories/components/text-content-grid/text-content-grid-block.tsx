import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";

import { ThemeName } from '../../types/theme-name';
import { ContentGridBlock } from '../content-grid/content-grid-block';

export interface TextContentGridBlockProps {
  theme: ThemeName;
  topDivider: boolean;
}

export const TextContentGridBlock = ({
  theme, 
  topDivider, 
  children 
}: PropsWithChildren<TextContentGridBlockProps>) => {
  return (
    <ContentGridBlock blockTypeModifier="text-content" theme={theme} topDivider={topDivider}>
      {children}
    </ContentGridBlock>
  )
}