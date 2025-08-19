import * as React from 'jsx-dom';
import { PropsWithChildren } from 'jsx-dom';

import './card-grid.scss';

export interface CardGridProps {
  cardType: 'preview' | 'content' | 'contact';
}

export const CardGrid = ({
  cardType,
  children
}: PropsWithChildren<CardGridProps>) => {
  return (
    <div class={`card-grid card-grid--${cardType} row`}>
      { children }
    </div>
  )
}
