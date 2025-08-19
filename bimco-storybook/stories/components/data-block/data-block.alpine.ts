import { AlpineComponent } from 'alpinejs';
import Tab from 'bootstrap/js/dist/tab';

interface DataBlockData {
  tabs: {
    tabEl: HTMLElement;
    tab: Tab;
  }[];
}

export default function dataBlock(): AlpineComponent<DataBlockData> {
  return {
    tabs: [],

    init() {
      const tabEls = Array.from(this.$el.querySelectorAll('[data-bs-toggle="tab"]'));
      this.tabs = tabEls.map((tabEl: HTMLElement) => {
        return {
          tabEl: tabEl,
          tab: new Tab(tabEl)
        }
      });
    }
  };
}