import { AlpineComponent } from "alpinejs";
import Swiper from "swiper";
import { A11y, Scrollbar } from "swiper/modules";

interface LargeCardCarouselData {
  el: HTMLElement;
  swiper: Swiper;
  createSwiper(): void;
  destroySwiper(): void;
}

export default function largeCardCarousel(): AlpineComponent<LargeCardCarouselData> {
  return {
    swiper: null,
    el: null,

    init() {
      this.el = this.$el;

      if (this.el instanceof HTMLElement) {
        const slides = this.el.querySelectorAll(".swiper-slide");
        // Only create Swiper if there are 3 or more cards
        if (slides.length >= 3) {
          this.createSwiper();
        }
      }
    },

    createSwiper() {
      const scrollbarEl = this.el.querySelector(
        ".large-card-carousel__scrollbar"
      );

      if (scrollbarEl) {
        this.swiper = new Swiper(this.el, {
          modules: [Scrollbar, A11y],
          scrollbar: {
            el: scrollbarEl,
            dragClass: "large-card-carousel__drag",
            draggable: true,
            dragSize: 16,
            snapOnRelease: true,
            hide: false,
          },
          watchOverflow: true,
          slidesPerView: 1,
          spaceBetween: 25,
          speed: 500,
          breakpoints: {
            744: {
              slidesPerView: 1.4,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 2.2,
              spaceBetween: 16,
            },
          },
        });

        // Ensure the drag element uses a square shape with glow
        const dragEl = scrollbarEl.querySelector(".large-card-carousel__drag");
        if (dragEl) {
          dragEl.classList.add("square-glow");
        }
      }
    },

    destroySwiper() {
      if (this.swiper) {
        this.swiper.destroy();
        this.swiper = null;
      }
    },
  };
}
