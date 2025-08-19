import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";

import { UmbBlockGridItem } from '../../layout/umb-block/umb-block-grid-item';
import { TextContent, TextContentProps } from './text-content';

export interface TextContentGridItemProps {
  colSpan: 3 | 4 | 6 | 7;
  typeAlias: 'textContentGridItemMain' | 'textContentGridItemAdditional' | 'textContentGridItemAdditionaWide';
  textContent: TextContentProps;
}

export const TextContentGridItem = ({
  colSpan, 
  typeAlias, 
  textContent,
  children
}: PropsWithChildren<TextContentGridItemProps>) => {
  return (
    <UmbBlockGridItem typeAlias={typeAlias} colSpan={colSpan} rowSpan={1}>
      { TextContent({...textContent, children: children}) }
    </UmbBlockGridItem>
  )
}