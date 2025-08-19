import { AlpineComponent } from 'alpinejs';
import { ScrollTriggersStoreAccessor } from './scroll-triggers.store';

export default function scrollTriggersBlockRegister(enabled: boolean): AlpineComponent<object> {
  return {
    init() {
      if (enabled) {
        const scrollTriggerBlockEls = (this.$el as HTMLElement).querySelectorAll('[data-scroll-trigger-block-id]');

        if (scrollTriggerBlockEls.length) {
          ScrollTriggersStoreAccessor.ensureStore();
          const scrollTriggersStore = ScrollTriggersStoreAccessor.getStore();

          scrollTriggerBlockEls.forEach((blockEl: HTMLElement) => {
            scrollTriggersStore.registerBlock({ 
              id: blockEl.dataset.scrollTriggerBlockId,
              blockEl: blockEl,
              loaded: false
            });
          });

          scrollTriggersStore.initSmoothScrolling();
        }
      }
    }
  }
}
