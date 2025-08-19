import { AlpineComponent } from 'alpinejs';
import Swiper from 'swiper';
import { A11y, Pagination, EffectFade } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTriggerBlockData } from '../scroll-triggers/scroll-trigger-block.alpine';
import { ScrollTriggersStoreAccessor } from '../scroll-triggers/scroll-triggers.store';

interface FullscreenSlidesData extends ScrollTriggerBlockData {
  swiper: Swiper;
  hasScrollTrigger: boolean;
  createSwiper(): void;
}

export default function fullscreenSlides(hasScrollTrigger: boolean): AlpineComponent<FullscreenSlidesData> {
  return {
    blockId: null,
    swiper: null,
    hasScrollTrigger: hasScrollTrigger,

    init() {
      if (this.hasScrollTrigger) {
        this.blockId = this.$el.dataset.scrollTriggerBlockId;
        const scrollTriggersStore = ScrollTriggersStoreAccessor.getStore();
        scrollTriggersStore.setBlockLoaded(this.blockId, () => { this.setupScrollTriggers() });
      }
      else {
        this.createSwiper();
      }
    },

    setupScrollTriggers() {
      const triggerEl: HTMLElement = this.$refs.slides;
      const slideItems = Array
        .from(triggerEl.querySelectorAll<HTMLElement>('.fullscreen-slide-item'))
        .map(itemEl => {
          return {
            itemEl: itemEl,
            imageEl: itemEl.querySelector('.fullscreen-slide-item__image-container'),
            contentEl: itemEl.querySelector('.fullscreen-slide-item__content')
          }
        });

      const n = slideItems.length;
      const durationBase = 100 / (n - 1);

      const tlIn = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top bottom',
          end: 'top top',
          scrub: true
        }
      });

      const tlPinned = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: `top top-=${n - 1}00%`,
          scrub: true,
          pin: true
        }
      });

      const tlOut = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'bottom bottom-=1px',
          end: 'bottom top',
          scrub: true
        }
      });

      tlIn
        .fromTo(slideItems[0].contentEl, {
          y: '-50lvh'
        }, {
          y: 0,
          duration: 100,
          ease: 'power1.out'
        });

      for (let i = 0; i < n - 1; i++) {
        tlPinned
          .fromTo(slideItems[i].contentEl, {
            scale: 1,
            opacity: 1
          }, {
            scale: 0.8,
            opacity: 0.8,
            duration: durationBase,
            ease: 'power1.in'
          }, durationBase * i)
          .fromTo(slideItems[i].contentEl, {
            opacity: 0
          }, {
            opacity: 0,
            duration: 100 - (durationBase * (i + 1)),
            ease: 'power1.in'
          }, durationBase * (i + 1));
      }

      for (let i = 1; i < n; i++) {
        tlPinned
          .fromTo(slideItems[i].contentEl, {
            y: `-${i - 1}00lvh`
          }, {
            y: `-${i}00lvh`,
            duration: durationBase,
            ease: 'power1.out'
          }, durationBase * (i - 1))
          .fromTo(slideItems[i].imageEl, {
            opacity: 0,
          }, {
            opacity: 1,
            duration: durationBase * 0.8,
            ease: 'power1.in'
          }, durationBase * (i - 1));
      }

      tlOut
        .fromTo(slideItems[n - 1].contentEl, {
          scale: 1,
          opacity: 1
        }, {
          scale: 0.8,
          opacity: 0.8,
          duration: 100,
          ease: 'power1.in'
        }, 0);
    },

    async createSwiper() {
      await this.$nextTick();

      const swiperEl: HTMLElement = this.$refs.slides;
      const paginationEl: HTMLElement = this.$refs.slidesPagination;

      if (paginationEl) {
        this.swiper = new Swiper(swiperEl, {
          modules: [A11y, Pagination, EffectFade],
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          pagination: {
            el: paginationEl,
            bulletClass: 'fullscreen-slides__pagination-item',
            bulletActiveClass: 'fullscreen-slides__pagination-item--active',
            clickable: true,
          },
          slidesPerView: 1,
          speed: 500,
        });
      }
    }
  };
}
