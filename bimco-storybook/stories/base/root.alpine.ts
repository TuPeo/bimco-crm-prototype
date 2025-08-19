import { AlpineComponent } from 'alpinejs';
import { MediaQueryStoreAccessor } from './alpine/media-query.store';

interface Breakpoints {
  [name: string]: number;
}

interface RootData {
  dispatchInit(): void;
  handleResize(): void;
}

export default function root(breakpoints: Breakpoints): AlpineComponent<RootData> {
  return {
    init() {
      MediaQueryStoreAccessor.ensureStore();
      const mediaQuery = MediaQueryStoreAccessor.getStore();

      Object.keys(breakpoints).forEach((key: string) => {
        mediaQuery.matches[key] = { size: breakpoints[key] };
      });

      this.handleResize();
      this.dispatchInit();
    },

    async dispatchInit() {
      await this.$nextTick();

      this.$dispatch('root-load');
    },

    handleResize() {
      const mediaQuery = MediaQueryStoreAccessor.getStore();

      mediaQuery.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion)').matches;
      mediaQuery.viewportHeight.size = window.innerHeight;
      mediaQuery.viewportWidth.size = this.$refs.body?.clientWidth || window.innerWidth;
      mediaQuery.scrollbarWidth.size = window.innerWidth - mediaQuery.viewportWidth.size;

      Object.keys(mediaQuery.matches).forEach((key: string) => {
        const match = mediaQuery.matches[key];
        match.up = window.matchMedia(`(min-width: ${match.size}px)`).matches;
        match.down = !match.up;
      });
    }
  }
}
