import * as React from 'jsx-dom';
import { ReactNode } from 'jsx-dom';

export interface UmbBlockListProps {
  children: ReactNode;
}

export const UmbBlockList = ({ children }: UmbBlockListProps) => {
  return (
    <div class="umb-block-list">
      { children }
    </div>
  )
}