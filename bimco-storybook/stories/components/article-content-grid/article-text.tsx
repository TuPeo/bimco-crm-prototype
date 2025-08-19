import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";

import '../content-grid/content-grid-item.scss';

export const ArticleText = ({
  children
}: PropsWithChildren<object>) => {
  return (
    <div class="content-grid-item content-grid-item--text rich-text">
      {children}
    </div>
  )
}