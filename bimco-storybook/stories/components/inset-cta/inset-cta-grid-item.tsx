import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";

import { UmbBlockGridItem } from '../../layout/umb-block/umb-block-grid-item';
import { InsetCta, InsetCtaProps } from './inset-cta';

export interface InsetCtaGridItemProps {
  colSpan: 4 | 6;
  rowSpan: 1 | 2;
  insetCta: InsetCtaProps;
}

export const InsetCtaGridItem = ({
  colSpan,
  rowSpan, 
  insetCta,
  children
}: PropsWithChildren<InsetCtaGridItemProps>) => {
  return (
    <UmbBlockGridItem typeAlias="insetCtaBlock" colSpan={colSpan} rowSpan={rowSpan}>
      { InsetCta({...insetCta, children: children}) }
    </UmbBlockGridItem>
  )
}