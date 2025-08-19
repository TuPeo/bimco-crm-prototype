import Alpine from 'alpinejs';

const STORE_KEY = 'bodyScrollbar';

export interface BodyScrollbarStore {
  bodyEl: HTMLElement;
  hidden: boolean;
  hide(): void;
  reset(): void;
}

export class BodyScrollbarStoreAccessor {
  static readonly registerStore = () => Alpine.store(STORE_KEY, {
    init() {
      const _this = this as BodyScrollbarStore;
      _this.bodyEl = document.body;
      _this.hidden = false;
    },
  
    hide() {
      const _this = this as BodyScrollbarStore;
      if (!_this.hidden) {
        const width = Math.abs(window.innerWidth - _this.bodyEl.clientWidth);
        _this.bodyEl.style.overflow = 'hidden';
        _this.bodyEl.style.paddingRight = `${width}px`;
        _this.hidden = true;
      }
    },
  
    reset() {
      const _this = this as BodyScrollbarStore;
      _this.bodyEl.style.overflow = null;
      _this.bodyEl.style.paddingRight = null;
      _this.hidden = false;
    }
  });

  static getStore = () => { 
    let store = Alpine.store(STORE_KEY) as BodyScrollbarStore;

    if (!store) {
      this.registerStore();
      store = Alpine.store(STORE_KEY) as BodyScrollbarStore;
    }

    return store;
  }

  static readonly ensureStore = () => {
    const store = this.getStore();
    if (!store) {
      this.registerStore();
    }
  }
}
