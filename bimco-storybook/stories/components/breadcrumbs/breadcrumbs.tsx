import * as React from 'jsx-dom';
import './breadcrumbs.scss'
import LinkArgs from '../../types/link-args';

export interface BreadcrumbsProps {
  crumbs: LinkArgs[];
  contextClass?: string;
}

export const crumbs = [
  {
    label: "Long page title",
    url: "/"
  },
  {
    label: "What's on?",
    url: "/"
  },
  {
    label: "News & Insights News & Insights",
    url: "/"
  },
  {
    label: "About",
    url: "/"
  },
  {
    label: "Current page title is very long",
    url: "/"
  },
];

export const Breadcrumbs = ({
  crumbs,
  contextClass = null,
}: BreadcrumbsProps) => {

  const classNames = ['breadcrumbs'];
  if (contextClass) {
    classNames.push(contextClass);
  }

  return <ul 
    className={classNames}
    x-load
    x-data={`breadcrumbs(${JSON.stringify(crumbs.slice(0, crumbs.length - 1))})`}
    x-effect="handleResize($store.mediaQuery)">

    <template x-for="item in items">
      <li class="breadcrumbs__item"
        x-on:mouseenter="!$store.mediaQuery.isTouch && showExpand(item)"
        x-on:mouseleave="!$store.mediaQuery.isTouch && hideExpand(item)"
        /* x-on:click.outside="hideExpand(item)" // Can't use '.' in attribute names in JSX */>

        <a class="breadcrumbs__link"
          x-bind:href="item.url"
          x-html="item.label"
          x-on:click="handleItemClick($event, item)"></a>
        <span class="breadcrumbs__divider">/</span>

        <template x-if="item.expand">
          <div class="breadcrumbs__expand"
            x-bind:class="{ 'active' : item.expand.active, 'breadcrumbs__expand--right' : item.expand.position == 'right' }"
            x-ref="expandEl">
            <template x-for="expandItem in item.expand.items">
              <a class="breadcrumbs__expand-item"
                x-bind:href="expandItem.url"
                x-text="expandItem.label"></a>
            </template>
          </div>
        </template>
      </li>
    </template>

    <li class="breadcrumbs__item">
        <span class="breadcrumbs__link breadcrumbs__link--current">{crumbs[crumbs.length - 1].label}</span>
    </li>
  </ul>
};
