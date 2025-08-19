import Alpine from 'alpinejs';

const registerAsyncData = () => {
  Alpine.asyncData('root', () => import('../root.alpine'));
  Alpine.asyncData('scrollable', () => import('../scrollable.alpine'));
  
  Alpine.asyncData('filterBar', () => import('../../elements/filter-bar/filter-bar-component.alpine'));
  Alpine.asyncData('helpTooltip', () => import('../../elements/help-tooltip/help-tooltip.alpine'));
  Alpine.asyncData('progressCircular', () => import('../../elements/progress-circular/progress-circular-component.alpine'));
  Alpine.asyncData('progressLinear', () => import('../../elements/progress-linear/progress-linear-component.alpine'));
  Alpine.asyncData('toastComponent', () => import('../../elements/toast/toast.alpine'));
  Alpine.asyncData('dateInput', () => import('../../elements/form-control/date-input/date-input.alpine'));
  Alpine.asyncData('choicesSelect', () => import('../../elements/form-control/choices/choices-select.alpine'));
  
  Alpine.asyncData('breadcrumbs', () => import('../../components/breadcrumbs/breadcrumbs.alpine'));
  Alpine.asyncData('contactCard', () => import('../../components/contact-card/contact-card.alpine'));
  Alpine.asyncData('accordionBlock', () => import('../../components/accordion-block/accordion-block.alpine'));
  Alpine.asyncData('bimcoHeader', () => import('../../components/bimco-header/bimco-header.alpine'));
  Alpine.asyncData('featureCarousel', () => import('../../components/feature-carousel/feature-carousel.alpine'));
  Alpine.asyncData('chapterLinks', () => import('../../components/chapter-links/chapter-links.alpine'));
  Alpine.asyncData('largeCardCarousel', () => import('../../components/large-card-carousel/large-card-carousel.alpine'));
  Alpine.asyncData('googleMap', () => import('../../components/google-map/google-map.alpine'));
  Alpine.asyncData('navigationSwiper', () => import('../../components/navigation-swiper/navigation-swiper.alpine'));
  Alpine.asyncData('pinnedLinks', () => import('../../components/pinned-links/pinned-links-component.alpine'));
  Alpine.asyncData('searchMenu', () => import('../../components/search-menu/search-menu.alpine'));
  Alpine.asyncData('fullscreenSlides', () => import('../../components/fullscreen-slides/fullscreen-slides.alpine'));
  Alpine.asyncData('logoCarousel', () => import('../../components/logo-grid/logo-carousel.alpine'));
  Alpine.asyncData('videoCarousel', () => import('../../components/video-carousel/video-carousel.alpine'));
  Alpine.asyncData('contentListingCarousel', () => import('../../components/content-listing-carousel/content-listing-carousel.alpine'));
  Alpine.asyncData('dataBlock', () => import('../../components/data-block/data-block.alpine'));
  
  Alpine.asyncData('pagination', () => import('../../components/pagination/pagination.alpine'));
  
  Alpine.asyncData('scrollTriggersBlockRegister', () => import('../../components/scroll-triggers/scroll-triggers-block-register.alpine'));
  Alpine.asyncData('scrollTriggerBlock', () => import('../../components/scroll-triggers/scroll-trigger-block.alpine'));
  Alpine.asyncData('parallaxBgBlock', () => import('../../components/parallax-bg-block/parallax-bg-block.alpine'));
  Alpine.asyncData('longformArticleHero', () => import('../../components/longform-article-hero/longform-article-hero.alpine'));
  Alpine.asyncData('homePageHeaderContent', () => import('../../components/home-page-header-content/home-page-header-content.alpine'));
}

export { registerAsyncData };
