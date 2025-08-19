import { AlpineComponent } from "alpinejs";
import Swiper from "swiper";
import { A11y, Navigation, Pagination } from "swiper/modules";

interface VideoCarouselData {
  el: HTMLElement | null;
  prevEl: HTMLElement | null;
  nextEl: HTMLElement | null;
  swiper: Swiper | null;
  swiperEl: HTMLElement | null;
  swiperSlideElements: HTMLElement[];
  createSwiper(): void;
}

export default function videoCarousel(): AlpineComponent<VideoCarouselData> {
  return {
    el: null,
    prevEl: null,
    nextEl: null,
    swiper: null,
    swiperEl: null,
    swiperSlideElements: [],

    init() {
      this.el = this.$el;
      this.swiperEl = this.$refs.swiper;
      this.prevEl = this.$refs.prevEl;
      this.nextEl = this.$refs.nextEl;
      this.swiperSlideElements = Array.from(this.swiperEl.querySelector(".swiper-wrapper")?.children);
      this.createSwiper();
    },

    createSwiper() {
      this.swiperSlideElements
      .forEach((el: HTMLElement) => {
        const playButton = el.querySelector(".video-carousel__play-button") as HTMLElement;
        const pauseButton = el.querySelector(".video-carousel__pause-button") as HTMLElement;
        playButton.setAttribute("style", "display: block");
        pauseButton.setAttribute("style", "display: none");
        const slideVideo = el.querySelector(".video-carousel__video") as HTMLVideoElement;
        pauseButton?.addEventListener("click", () => {
          slideVideo.pause();
          playButton.setAttribute("style", "display: block");
          pauseButton.setAttribute("style", "display: none");
        });
        playButton?.addEventListener("click", () => {
          slideVideo.play();
          playButton.setAttribute("style", "display: none");
          pauseButton.setAttribute("style", "display: block");
        });
      });

      this.swiper = new Swiper(this.swiperEl, {
        modules: [Navigation, A11y, Pagination],
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 500,
        navigation: {
          prevEl: this.prevEl,
          nextEl: this.nextEl
        },
        pagination: {
          el: this.$refs.pagination,
          bulletClass: "video-carousel__pagination-item",
          bulletActiveClass: "video-carousel__pagination-item--active",
          clickable: true,
          renderBullet: function(index, className) {
            return `<span key=${index} class="${className}"><img class="pagination-thumbnail"/></span>`;
          }
        },
        on: {
          afterInit: function() {
            const paginationThumbnails = this.pagination.el.querySelectorAll(".video-carousel__pagination-item img") as HTMLImageElement[];
            const slideThumbnails = this.slidesEl.querySelectorAll(".swiper-slide .video-carousel__slide-thumbnail img") as HTMLImageElement[];
            paginationThumbnails.forEach((thumbnail, index) => {
              thumbnail.setAttribute("src", slideThumbnails[index].getAttribute("src") ?? "");
              thumbnail.setAttribute("alt", slideThumbnails[index].getAttribute("alt") ?? "");
            })
            const carouselEl = this.el.parentNode?.parentNode?.parentNode as HTMLElement;
            if (carouselEl) {
              carouselEl.setAttribute("style", `--current-thumbnail-url: url("${slideThumbnails[0].src}");`);
            }
          },
          realIndexChange: function() {
            const slideElements = this.slides as HTMLElement[];
            slideElements.forEach(slide => {
              const playButton = slide.querySelector(".video-carousel__play-button") as HTMLElement;
              const pauseButton = slide.querySelector(".video-carousel__pause-button") as HTMLElement;
              const slideVideo = slide.querySelector(".video-carousel__video") as HTMLVideoElement;
              slideVideo.pause();
              playButton.setAttribute("style", "display: block");
              pauseButton.setAttribute("style", "display: none");
            });

            const swiperEl = this.el as HTMLElement;
            const slideThumbnails = this.slidesEl.querySelectorAll(".swiper-slide .video-carousel__slide-thumbnail img") as HTMLImageElement[];
            const carouselEl = swiperEl.parentNode?.parentNode?.parentNode as HTMLElement;
            if (carouselEl) {
              carouselEl.setAttribute("style", `--current-thumbnail-url: url("${slideThumbnails[this.realIndex].src}");`);
            }
          }
        }
      });
    },

    destroy() {
      this.swiper.destroy();
      this.swiper = null;
    }
  };
}
