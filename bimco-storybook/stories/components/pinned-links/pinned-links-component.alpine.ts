import { AlpineComponent } from 'alpinejs';
import PerfectScrollbar from 'perfect-scrollbar';

interface PinnedLinksData {
  el: HTMLElement | null;
  links: HTMLElement | null;
}

export default function pinnedLinks(): AlpineComponent<PinnedLinksData> {
  return {
    el: null,
    links: null,

    init() {
      this.el = this.$el as HTMLElement;
      this.links = this.$refs.links;
      new PerfectScrollbar(this.links);
    }
  }
}
