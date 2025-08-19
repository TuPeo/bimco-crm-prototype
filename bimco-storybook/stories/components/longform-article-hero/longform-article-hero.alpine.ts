import { AlpineComponent } from 'alpinejs';
import { gsap } from 'gsap';
import { ScrollTriggersStoreAccessor } from '../scroll-triggers/scroll-triggers.store';
import { ScrollTriggerBlockData } from '../scroll-triggers/scroll-trigger-block.alpine';
import { MediaQueryStoreAccessor } from '../../base/alpine/media-query.store';

export default function longformArticleHero(): AlpineComponent<ScrollTriggerBlockData> {
  return {
    blockId: null,

    init() {
      this.blockId = this.$el.dataset.scrollTriggerBlockId;
      const scrollTriggersStore = ScrollTriggersStoreAccessor.getStore();
      scrollTriggersStore.setBlockLoaded(this.blockId, () => { this.setupScrollTriggers() });
    },

    setupScrollTriggers() {
      const mediaQuery = MediaQueryStoreAccessor.getStore();

      const blockEl: HTMLElement = this.$el;
      const backgroundEl: HTMLElement = this.$refs.longformArticleHeroBg;
      const backgroundWashEl: HTMLElement = this.$refs.longformArticleHeroBgWash;
      const descriptionEl: HTMLElement = this.$refs.longformArticleHeroDesc;

      const headerEl: HTMLElement = document.querySelector('.main-page-layout__header');
      const topThreshold = headerEl?.clientHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blockEl,
          start: `top ${topThreshold}px`,
          end: 'bottom top',
          scrub: true
        }
      });

      tl
        .fromTo(backgroundEl, {
          scale: 1,
        }, {
          scale: 0.6,
          duration: 100,
          ease: 'none'
        }, 0)
        .fromTo(backgroundWashEl, {
          opacity: 1
        }, {
          opacity: 0,
          duration: 50,
          ease: 'power1.in'
        }, 0);

      if (mediaQuery.matches.md.up) {
        tl
          .fromTo(descriptionEl, {
            y: -40,
            opacity: 0,
          }, {
            y: 0,
            opacity: 1,
            duration: 50,
            ease: 'power1.out'
          }, 0);
      }
    }
  }
}
