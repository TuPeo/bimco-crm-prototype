import { AlpineComponent } from "alpinejs";
import Swiper from "swiper";
import { A11y, Pagination } from "swiper/modules";
import { MediaQueryStore, MediaQueryStoreAccessor } from "../../base/alpine/media-query.store";

interface NavigationSwiperData {
  el: HTMLElement | null;
  swiperSlideElements: HTMLElement[] | null;
  paginationLabels: string[];
  swiper: Swiper | null;
  createSwiper(): void;
  destroySwiper(): void;
  handleResize(mediaQueryStore: MediaQueryStore): void;
}

export default function navigationSwiper(slideCssClass: string): AlpineComponent<NavigationSwiperData> {
  return {
    el: null,
    swiperSlideElements: null,
    paginationLabels: [],
    swiper: null,
    
    init() {
      MediaQueryStoreAccessor.ensureStore();

      this.el = this.$el;
      this.swiperSlideElements = Array.from(this.el.querySelectorAll(`.${slideCssClass}`));

      // const mediaQueryStore = MediaQueryStoreAccessor.getStore();
      // this.handleResize(mediaQueryStore);
    },

    createSwiper() {
      this.swiperSlideElements
      .forEach((el: HTMLElement) => el.classList.add("swiper-slide"));

      const paginationLabels = this.swiperSlideElements.map((el: HTMLElement, index: number) => {
        const swiperLabelAttribute = el.dataset.swiperPaginationLabel;
        return swiperLabelAttribute ?? (index + 1).toString();
      });

      this.swiper = new Swiper(this.el, {
        modules: [A11y, Pagination],
        pagination: {
          el: this.$refs.pagination,
          bulletClass: "navigation-swiper__pagination-item",
          bulletActiveClass: "navigation-swiper__pagination-item--active",
          clickable: true,
          renderBullet: function (index, className) {
            const indexDisplay = paginationLabels[index];

            return `
            <span class="${className}">
              <span class="navigation-swiper__pip"> </span> 
              <span class="navigation-swiper__index">${ indexDisplay }</span> 
            </span>`;
          },
        },
        slidesPerView: 1,
        spaceBetween: 5
      });
    },

    destroySwiper() {
      this.swiper.destroy();
      this.swiper = null;
    },

    handleResize(mediaQueryStore: MediaQueryStore) {
      const isHigherThanMd = mediaQueryStore.matches["md"].up
      if (isHigherThanMd && this.swiper) {
        this.destroySwiper();
      }
      else if (!isHigherThanMd && !this.swiper){
        this.createSwiper();
      }
    }
  }
}