import Alpine from 'alpinejs';

const STORE_KEY = 'mediaQuery';

export interface Match {
  size: number;
  down?: boolean;
  up?: boolean;
}

export class StyleProperty {
  private _defaultValue: string;

  constructor(defaultValue: string) {
    this._defaultValue = defaultValue;
  }

  size?: number;

  get value(): string {
    return this.size ? `${this.size}px` : this._defaultValue;
  }
}

export interface MediaQueryStore {
  matches: {
    [name: string]: Match;
  };
  isTouch: boolean;
  prefersReducedMotion: boolean;
  viewportHeight: StyleProperty;
  viewportWidth: StyleProperty;
  scrollbarWidth: StyleProperty;
  init(): void;
}

export class MediaQueryStoreAccessor {
  static registerStore = () => Alpine.store(STORE_KEY, {
    matches: {},
    isTouch: false,
    prefersReducedMotion: false,
    viewportHeight: new StyleProperty('100vh'),
    viewportWidth: new StyleProperty('100vw'),
    scrollbarWidth: new StyleProperty('0px'),

    init() {
      const _this = this as MediaQueryStore;
      // Ensure Match object exists for each breakpoint
      ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'].forEach((key: string) => {
        _this.matches[key] = { size: 0 };
      });
      _this.isTouch = navigator.maxTouchPoints > 0;
    }
  } satisfies MediaQueryStore);

  static getStore = () => { 
    let store = Alpine.store(STORE_KEY) as MediaQueryStore;

    if (!store) {
      this.registerStore();
      store = Alpine.store(STORE_KEY) as MediaQueryStore;
    }

    return store;
  }

  static ensureStore = () => {
    const store = this.getStore();
    if (!store) {
      this.registerStore();
    }
  }
}
