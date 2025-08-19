import { AlpineComponent } from 'alpinejs';
import Swiper from 'swiper';
import { Navigation, Scrollbar, Pagination, A11y, Mousewheel } from 'swiper/modules';

interface FeatureCarouselData {
  swiper: Swiper;
  swiperHeight: string | null;
  preInit: boolean;
  initSwiper(): void;
}

export default function featureCarousel(): AlpineComponent<FeatureCarouselData> {
  return {
    swiper: null,
    swiperHeight: null,
    preInit: true,

    init() {
      this.swiperHeight = `${this.$refs.swiper.clientHeight}px`;
      this.preInit = false;
      this.initSwiper();
    },

    async initSwiper() {
      await this.$nextTick();

      this.swiper = new Swiper(this.$refs.swiper, {
        modules: [Navigation, Scrollbar, Pagination, A11y, Mousewheel],
        slidesPerView: 1,
        spaceBetween: 16,
        navigation: {
          nextEl: this.$refs.swiperNext,
          prevEl: this.$refs.swiperPrev,
        },
        mousewheel: {
          enabled: true
        },
        scrollbar: {
          el: this.$refs.swiperScrollbar,
          dragClass: 'feature-carousel__scrollbar-drag',
          dragSize: 120,
          snapOnRelease: true,
          hide: false,
          draggable: false,
        },
        centeredSlides: true,
        centeredSlidesBounds: true,
        loop: true,
        watchOverflow: true,
        breakpoints: {
          540: {
            slidesPerView: 1.5,
            scrollbar: {
              dragSize: 160,
            },
          },
          744: {
            slidesPerView: 2,
            scrollbar: {
              dragSize: 320,
            },
          },
          1280: {
            slidesPerView: 3,
            scrollbar: {
              dragSize: 540,
            },
          },
          1920: {
            slidesPerView: 3,
            scrollbar: {
              dragSize: 720,
            },
          },
        },
      });
    }
  };
}
