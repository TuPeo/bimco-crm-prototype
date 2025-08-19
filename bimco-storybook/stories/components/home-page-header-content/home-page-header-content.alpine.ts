import { AlpineComponent } from 'alpinejs';
import { gsap } from 'gsap';
import { ScrollTriggersStoreAccessor } from '../scroll-triggers/scroll-triggers.store';
import { ScrollTriggerBlockData } from '../scroll-triggers/scroll-trigger-block.alpine';

export default function homePageHeaderContent(): AlpineComponent<ScrollTriggerBlockData> {
  return {
    blockId: null,

    init() {
      this.blockId = this.$el.dataset.scrollTriggerBlockId;
      const scrollTriggersStore = ScrollTriggersStoreAccessor.getStore();
      scrollTriggersStore.setBlockLoaded(this.blockId, () => { this.setupScrollTriggers() });
    },

    setupScrollTriggers() {
      const blockEl: HTMLElement = this.$el;
      const wrapperEl: HTMLElement = blockEl.closest('.home-page-header-content');
      const backgroundEl: HTMLElement = this.$refs.homePageHeroBg;
      const contentRowEl: HTMLElement = this.$refs.homePageHeroContentRow;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperEl,
          start: `top top`,
          end: 'bottom center',
          scrub: true
        }
      });

      tl
        .fromTo(backgroundEl, {
          opacity: 1
        }, {
          opacity: 0,
          duration: 100,
          ease: 'power1.inOut'
        }, 0)
        .fromTo(contentRowEl, {
          y: 0
        }, {
          y: '50svh',
          duration: 100,
          ease: 'power1.out'
        }, 0)
        .fromTo(contentRowEl, {
          opacity: 1
        }, {
          opacity: 0,
          duration: 100,
          ease: 'power1.inOut'
        }, 0);
    }
  }
}
