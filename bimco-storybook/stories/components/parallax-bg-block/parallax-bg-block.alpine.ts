import { AlpineComponent } from 'alpinejs';
import { gsap } from 'gsap';
import { ScrollTriggersStoreAccessor } from '../scroll-triggers/scroll-triggers.store';
import { ScrollTriggerBlockData } from '../scroll-triggers/scroll-trigger-block.alpine';

export interface ParallaxBgBlockData extends ScrollTriggerBlockData {
  videoPlaying: boolean;
}

export default function parallaxBgBlock(): AlpineComponent<ParallaxBgBlockData> {
  return {
    blockId: null,
    videoPlaying: false,

    init() {
      this.blockId = this.$el.dataset.scrollTriggerBlockId;
      const scrollTriggersStore = ScrollTriggersStoreAccessor.getStore();
      scrollTriggersStore.setBlockLoaded(this.blockId, async () => { await this.setupScrollTriggers() });

      const pictureEl: HTMLElement = this.$refs.parallaxBgPicture;
      this.$watch('videoPlaying', (value: boolean) => {
        if (value) {
          pictureEl?.classList.add('parallax-bg-block__background-picture--hidden');
        }
        else {
          pictureEl?.classList.remove('parallax-bg-block__background-picture--hidden');
        }
      });
    },

    async setupScrollTriggers() {
      const blockEl: HTMLElement = this.$el;
      const backgroundEl: HTMLElement = this.$refs.parallaxBgBackground;
      const videoEl: HTMLVideoElement = this.$refs.parallaxBgVideo;
      const contentBackdropEl: HTMLElement = this.$refs.parallaxBgContentBackdrop;
      const contentEl: HTMLElement = this.$refs.parallaxBgContent;

      blockEl.classList.add('parallax-bg-block');

      await this.$nextTick();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blockEl,
          start: 'top bottom+=2%',
          end: 'bottom top-=2%',
          scrub: true,
          onToggle: (self) => {
            if (self.isActive) {
              videoEl?.play();
            }
            else {
              videoEl?.pause();
            }
          }
        }
      });

      tl
        .fromTo(backgroundEl, {
          y: '-90svh'
        }, {
          y: '90svh',
          duration: 100,
          ease: 'none'
        }, 0)
        .fromTo(contentBackdropEl, {
          opacity: 0
        }, {
          opacity: 0.7,
          duration: 45,
          ease: 'power1.inOut'
        }, 0)
        .fromTo(contentBackdropEl, {
          opacity: 0.7
        }, {
          opacity: 0,
          duration: 45,
          ease: 'power1.inOut'
        }, 55)
        .fromTo(contentEl, {
          y: '-70svh'
        }, {
          y: '70svh',
          duration: 100,
          ease: 'none'
        }, 0)
        .fromTo(contentEl, {
          opacity: 0,
          scale: 0.8
        }, {
          opacity: 1,
          scale: 1,
          duration: 45,
          ease: 'sine.out'
        }, 0)
        .fromTo(contentEl, {
          opacity: 1,
          scale: 1
        }, {
          opacity: 0,
          scale: 0.8,
          duration: 45,
          ease: 'sine.in'
        }, 55);
    }
  }
}
