import { AlpineComponent } from 'alpinejs';
import PerfectScrollbar from 'perfect-scrollbar';
import { MediaQueryStore, MediaQueryStoreAccessor } from './alpine/media-query.store';

interface ScrollableData {
  ps: PerfectScrollbar;
  updateScrollable(mediaQuery: MediaQueryStore): void;
}

export default function scrollable(): AlpineComponent<ScrollableData> {
  return {
    ps: null,

    init() {
      MediaQueryStoreAccessor.ensureStore();
    },

    updateScrollable(mediaQuery: MediaQueryStore) {
      const useScrollbar = mediaQuery.viewportWidth.size && !mediaQuery.isTouch;
      if (useScrollbar && this.ps) {
        this.ps.update();
      }
      else if (useScrollbar) {
        this.ps = new PerfectScrollbar(this.$el);
      }
      else if (this.ps) {
        this.ps.destroy();
        this.ps = null;
      }
    }
  }
}
