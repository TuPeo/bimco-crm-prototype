import { AlpineComponent } from 'alpinejs';
import Swiper from 'swiper';
import { A11y, Navigation, Pagination, Mousewheel } from 'swiper/modules';

interface ContentListingCarouselData {
  swiper: Swiper;
  swiperHeight: string | null;
  preInit: boolean;
  initSwiper(): void;
}

export default function contentListingCarousel(): AlpineComponent<ContentListingCarouselData> {
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
        modules: [Navigation, A11y, Pagination, Mousewheel],
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 500,
        watchOverflow: true,
        navigation: {
          prevEl: this.$refs.swiperPrev,
          nextEl: this.$refs.swiperNext
        },
        mousewheel: {
          enabled: true
        },
        pagination: {
          el: this.$refs.swiperPagination,
          bulletClass: 'content-listing-carousel__pagination-item',
          bulletActiveClass: 'content-listing-carousel__pagination-item--active',
          clickable: true,
        },
        breakpoints: {
          540: {
            slidesPerView: 1.2
          },
          744: {
            slidesPerView: 2.4
          },
          1280: {
            slidesPerView: 3
          }
        }
      });
    }
  };
}
