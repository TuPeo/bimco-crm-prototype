import * as React from 'jsx-dom';
import { ReactNode } from 'jsx-dom';

import './content-grid-block.scss';

import { UmbBlockGrid } from '../../layout/umb-block/umb-block-grid';
import { ThemeName } from '../../types/theme-name';

export interface ContentGridBlockProps {
  blockTypeModifier: string;
  topDivider: boolean;
  theme: ThemeName;
  children: ReactNode;
}

export const ContentGridBlock = ({ blockTypeModifier, topDivider, theme, children }: ContentGridBlockProps) => {
  const classNames = ['content-grid-block', `content-grid-block--${blockTypeModifier}`];
  if (topDivider) {
    classNames.push('content-grid-block--has-top-divider');
  }
  const themeClasses = theme && `theme-zone theme--${theme}`;
  classNames.push(themeClasses);

  return (
    <div className={classNames}>
      <div class="content-grid-block__container bimco-container">
        <UmbBlockGrid>
          { children }
        </UmbBlockGrid>
      </div>
    </div>
  )
}