import { AlpineComponent } from "alpinejs";

import { MediaQueryStore, MediaQueryStoreAccessor } from '../../base/alpine/media-query.store';
import LinkArgs from "../../types/link-args";

class BreadcrumbItem implements LinkArgs {
  public url: string;
  public label: string;
  public expand: {
    items: LinkArgs[];
    active: boolean;
    position: 'right' | null;
  } | null;

  constructor(link: LinkArgs, expandItems: LinkArgs[] | null) {
    this.url = link.url;
    this.label = this._truncateLabel(link.label);
    this.expand = expandItems && {
      items: expandItems,
      active: false,
      position: null
    } || null;
  }

  private _truncateLabel = (label: string) => {
    let crumbWords = label.split(' ');
    let truncated = false;
    if (crumbWords.length > 3) {
      crumbWords = crumbWords.slice(0, 3);
      truncated = true;
    }
    label = crumbWords.join(' ');
    if (truncated) {
      label += '&hellip;';
    }
    return label;
  }
}

interface BreadcrumbsData {
  items: BreadcrumbItem[];
  handleResize(mediaQuery: MediaQueryStore): void;
  showExpand(item: BreadcrumbItem): void;
  hideExpand(item: BreadcrumbItem): void;
  handleItemClick(event: Event, item: BreadcrumbItem): void;
}

export default function breadcrumbs(crumbs: LinkArgs[]): AlpineComponent<BreadcrumbsData> {
  return {
    items: [],

    init() {
      MediaQueryStoreAccessor.ensureStore();
    },

    handleResize(mediaQuery: MediaQueryStore) {
      const maxItems = mediaQuery.matches.md.up ? 2 : 1;
      this.items = [];

      if (crumbs.length > maxItems) {
        const endCrumbsStartIndex = (crumbs.length - maxItems) + 1;
        const endCrumbs = crumbs.slice(endCrumbsStartIndex);
        const expandItems = crumbs.slice(1, endCrumbsStartIndex);

        this.items.push(new BreadcrumbItem(crumbs[0], null));
        this.items.push(new BreadcrumbItem({ url: '', label: '&hellip;' }, expandItems));
        if (endCrumbs.length) {
          this.items.push(...endCrumbs.map(crumb => new BreadcrumbItem(crumb, null)));
        }
      }
      else {
        this.items = crumbs.map(crumb => new BreadcrumbItem(crumb, null));
      }
    },

    showExpand(item: BreadcrumbItem) {
      if (item.expand) {
        const expandBounding = this.$refs.expandEl.getBoundingClientRect();
        item.expand.position = expandBounding && expandBounding.right > (window.innerWidth || document.documentElement.clientWidth) ? 'right' : null;
        item.expand.active = true;
      }
    },

    hideExpand(item: BreadcrumbItem) {
      if (item.expand) {
        item.expand.active = false;
        item.expand.position = null;
      }
    },

    handleItemClick(event: Event, item: BreadcrumbItem) {
      if (item.expand) {
        event.preventDefault();
        if (item.expand.active) {
          this.hideExpand(item);
        }
        else {
          this.showExpand(item);
        }
      }
    }
  }
}
