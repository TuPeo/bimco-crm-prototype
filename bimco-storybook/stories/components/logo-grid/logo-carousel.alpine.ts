import { AlpineComponent } from "alpinejs";
import Swiper from "swiper";
import { A11y, Autoplay } from "swiper/modules";

interface NavigationSwiperData {
  el: HTMLElement | null;
  swiper: Swiper | null;
  swiperInit: boolean;
  createSwiper(): void;
}

export default function logoCarousel(): AlpineComponent<NavigationSwiperData> {
  return {
    el: null,
    swiper: null,
    swiperInit: false,

    init() {
      this.el = this.$el;

      if (this.el) {
        this.createSwiper();
      }
    },

    createSwiper() {
      this.swiper = new Swiper(this.el, {
        freeMode: true,
        modules: [A11y, Autoplay],
        slidesPerView: 2.5,
        spaceBetween: 8,
        slidesPerGroup: 1,
        loop: true,
        autoplay: {
          delay: 0,
        },
        speed: 10000,
        breakpoints: {
          540: {
            slidesPerView: 3.5
          },
          744: {
            slidesPerView: 4.5
          },
          1280: {
            slidesPerView: 6.5
          }
        },
        on: {
          init: () => {
            this.swiperInit = true; 
          }
        }
      });
    }
  }
}