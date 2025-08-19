import { AlpineComponent } from 'alpinejs';
import { ScrollTriggersStoreAccessor } from './scroll-triggers.store';

export interface ScrollTriggerBlockData {
  blockId: string;
  setupScrollTriggers(): void;
}

export default function scrollTriggerBlock(): AlpineComponent<ScrollTriggerBlockData> {
  return {
    blockId: null,

    init() {
      this.blockId = this.$el.dataset.scrollTriggerBlockId;
      const scrollTriggersStore = ScrollTriggersStoreAccessor.getStore();
      scrollTriggersStore.setBlockLoaded(this.blockId, () => { this.setupScrollTriggers() });
    },

    setupScrollTriggers() { }
  }
}
