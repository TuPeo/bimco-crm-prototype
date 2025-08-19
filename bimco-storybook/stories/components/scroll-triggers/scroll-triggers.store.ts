import Alpine from 'alpinejs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const STORE_KEY = 'scrollTriggers';

export interface ScrollTriggerBlock {
  id: string;
  blockEl: HTMLElement;
  loaded: boolean;
  setupScrollTriggers?: CallableFunction;
}

export interface ScrollTriggersStore {
  lenis: Lenis;
  blocks: Array<ScrollTriggerBlock>;
  registerBlock(newBlock: ScrollTriggerBlock): void;
  setBlockLoaded(blockId: string, setupScrollTriggers: CallableFunction): void;
  initSmoothScrolling(): void;
}

export class ScrollTriggersStoreAccessor {
  static registerStore = () => Alpine.store(STORE_KEY, {
    init() {
      const _this = this as ScrollTriggersStore;

      gsap.registerPlugin(ScrollTrigger);

      _this.blocks = [];

      _this.registerBlock = (newBlock: ScrollTriggerBlock) => {
        if (!_this.blocks.find(block => block.id === newBlock.id)) {
          _this.blocks.push(newBlock);
        }
      }
      
      _this.setBlockLoaded = (blockId: string, setupScrollTriggers: CallableFunction) => {
        const block = _this.blocks.find(block => block.id === blockId);
        if (block) {
          block.loaded = true;
          block.setupScrollTriggers = setupScrollTriggers;
        }

        if (_this.blocks.every(block => block.loaded)) {
          _this.blocks.forEach(block => {
            if (block.setupScrollTriggers) {
              block.setupScrollTriggers();
            }
          });

          window.dispatchEvent(new CustomEvent('scroll-triggers-load-complete'));
        }
      }

      _this.initSmoothScrolling = () => {
        // Instantiate the Lenis object with specified properties
        _this.lenis = new Lenis({
          lerp: 0.1, // Lower values create a smoother scroll effect
          smoothWheel: true // Enables smooth scrolling for mouse wheel events
        });

        // Update ScrollTrigger each time the user scrolls
        _this.lenis.on('scroll', () => ScrollTrigger.update());

        // Define a function to run at each animation frame
        const scrollFn = (time: number) => {
          _this.lenis.raf(time); // Run Lenis' requestAnimationFrame method
          requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
        };
        // Start the animation frame loop
        requestAnimationFrame(scrollFn);
      }
    }
  });

  static getStore = () => Alpine.store(STORE_KEY) as ScrollTriggersStore;

  static ensureStore = () => {
    const store = this.getStore();
    if (!store) {
      this.registerStore();
    }
  }
}
