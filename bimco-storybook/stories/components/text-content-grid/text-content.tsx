import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";

import '../content-grid/content-grid-item.scss';
import { Button, ButtonProps } from '../../elements/button/button';
import { ButtonGroup } from '../../elements/button-group/button-group';

export interface TextContentProps {
  itemType: 'main' | 'additional';
  eyebrowText?: string;
  headingText?: string;
  ctas?: ButtonProps[];
}

export const TextContent = ({
   itemType, 
   eyebrowText, 
   headingText,
   ctas,
   children
  }: PropsWithChildren<TextContentProps>) => {
  const classNames = ['content-grid-item', 'content-grid-item--text'];
  if (itemType == 'main') {
    classNames.push('content-grid-item--text-main')
  }

  return (
    <div className={classNames}>
      {headingText && <h2>
        {eyebrowText && <span class="eyebrow">{ eyebrowText }</span>}
        { headingText }
      </h2>}
      <div class="rich-text">
        {children}
      </div>
      {ctas && <ButtonGroup contextClass="content-grid-item__btn-group">
        { ctas.map(ctaProps => <Button {...ctaProps} />) }
      </ButtonGroup>}
    </div>
  )
}
