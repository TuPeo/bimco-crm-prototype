import * as React from 'jsx-dom';

import './card-metadata.scss';

export interface CardMetaDataItem {
  type?: 'articletype' | 'date' | 'location';
  value: string;
  iconStyle?: 'regular' | 'solid';
  iconName?: string;
}

export interface CardMetaDataProps {
  items: CardMetaDataItem[];
  contextClass?: string;
}

export const CardMetaData = ({
  items = [],
  contextClass
}: CardMetaDataProps) => {
  return (
    <ul class={`${contextClass} card-metadata`}>
      {items.map(item => {
        const itemClasses = ['card-metadata__item'];
        if (item.type) {
          itemClasses.push(`card-metadata__item--${item.type}`);
        }
        return <li class={itemClasses}>
          { item.iconName && <i class={`fa-sharp fa-${item.iconStyle} fa-${item.iconName}`} aria-hidden="true"></i> }
          { item.value }
        </li>
      })}
    </ul>
  )
}
