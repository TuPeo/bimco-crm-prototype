import { AlpineComponent } from 'alpinejs';
import PerfectScrollbar from 'perfect-scrollbar';
import { gsap } from 'gsap';
import { BodyScrollbarStoreAccessor } from '../../base/alpine/body-scrollbar.store';
import { MediaQueryStoreAccessor } from '../../base/alpine/media-query.store';
import { ScrollTriggersStoreAccessor } from '../scroll-triggers/scroll-triggers.store';

interface HeaderItem {
  el: HTMLElement;
  id: string;
  link: HTMLLinkElement | null;
  mobileButton: HTMLButtonElement | null;
  navigationMenu: HTMLElement | null;
  isActive: boolean;
}

interface BimcoHeaderData {
  el: HTMLElement | null;
  topMenu: HTMLElement | null;
  searchMenu: HTMLElement | null;
  contentWrapper: HTMLElement | null;
  isTouch: boolean;
  headerExpanded: boolean;
  navMenuOpen: boolean;
  searchMenuOpen: boolean;
  headerItems: HeaderItem[];
  headerHidden: boolean;
  isOneLinkActive: boolean;
  isAnyMenuOpen: boolean;
  mobileBackButtonEnabled: boolean;
  mobileBackButtonText: string;
  innerExpandedHeight: string;
  setupScrollTriggers(): void;
  refreshScrollTriggers(): void;
  initEventHandlers(): void;
  initItemEventsHandlers(headerItem: HeaderItem): void;
  handleLinkActivation(headerItem: HeaderItem): void;
  handleLinkDeactivation(headerItem: HeaderItem, closeFullMenu: boolean): void;
  headerItemIsActive(itemId: string): boolean;
  setHeaderExpanded(expanded: boolean, innerEl?: HTMLElement): void;
  enableBackButton(text: string): void;
  disableBackButton(): void;
  openMobileMenu(): void;
  showTopMenu(): void;
  closeNavMenus(closeFullMenu: boolean): void;
  openSearchMenu(): void;
  closeSearchMenu(): void;
  toggleSearchMenu(): void;
  closeAllMenus(): void;
  hideHeader(): void;
  showHeader(): void;
}

export default function bimcoHeader(scrollIndicator: boolean): AlpineComponent<BimcoHeaderData> {
  return {
    el: null,
    topMenu: null,
    searchMenu: null,
    contentWrapper: null,
    isTouch: false,
    headerExpanded: false,
    navMenuOpen: false,
    searchMenuOpen: false,
    headerItems: [],
    headerHidden: false,
    mobileBackButtonEnabled: false,
    mobileBackButtonText: 'Go back',
    innerExpandedHeight: null,

    init() {
      this.el = this.$el as HTMLElement;
      this.topMenu = this.$refs.topMenu;
      this.searchMenu = this.$refs.searchMenu;
      this.contentWrapper = this.$refs.contentWrapper;

      MediaQueryStoreAccessor.ensureStore();
      this.isTouch = MediaQueryStoreAccessor.getStore().isTouch;

      this.headerItems = Array
        .from((this.$el as HTMLElement).querySelectorAll<HTMLElement>('.bimco-header__top-link-wrapper'))
        .map((el: HTMLElement) => {
          const headerItem: HeaderItem = {
            el: el,
            id: el.getAttribute('data-menu-id'),
            link: el.querySelector('.bimco-header__top-link--desktop-link'),
            mobileButton: el.querySelector('.bimco-header__top-link--mobile-button'),
            navigationMenu: el.querySelector('.bimco-header__navigation-menu-container'),
            isActive: false
          };
          return headerItem;
        });

      if (!this.isTouch) {
        this.headerItems.forEach((item: HeaderItem) => {
          if (item.navigationMenu) {
            new PerfectScrollbar(item.navigationMenu);
          }
        });
      }

      this.setupScrollTriggers();      
      this.initEventHandlers();
    },

    setupScrollTriggers() {
      ScrollTriggersStoreAccessor.ensureStore();

      const triggerEl: HTMLElement = document.querySelector('.main-page-layout__body');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onEnter: () => { this.hideHeader() },
          onLeaveBack: () => { this.showHeader() },
          onUpdate: (self) => { 
            if (self.direction == 1) {
              this.hideHeader();
            }
            else {
              this.showHeader();
            }
          }
        }
      });

      if (scrollIndicator) {
        tl
          .fromTo(this.$refs.supergraphicLeft, {
            scale: 0.2
          }, {
            scale: 1.8,
            duration: 100,
            ease: 'none'
          }, 0)
          .fromTo(this.$refs.supergraphicRight, {
            scale: 1.8
          }, {
            scale: 0.2,
            duration: 100,
            ease: 'none'
          }, 0);
      }

      this.refreshScrollTriggers = async () => {
        await this.$nextTick();

        tl.scrollTrigger.refresh();
      };
    },

    refreshScrollTriggers() { },

    initEventHandlers() {
      this.headerItems.forEach((item: HeaderItem) => this.initItemEventsHandlers(item));

      document.addEventListener('keydown', (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') {
          this.closeAllMenus();
        }
      })
    },

    initItemEventsHandlers(headerItem: HeaderItem) {      
      if (!this.isTouch) {
        headerItem.el.addEventListener('mouseenter', () => {
          this.handleLinkActivation(headerItem);
        });

        headerItem.el.addEventListener('mouseleave', () => {
          this.handleLinkDeactivation(headerItem, true);
        });
      }

      headerItem.link?.addEventListener('click', ev => {
        if (!headerItem.isActive && headerItem.navigationMenu) {
          ev.preventDefault();
          this.handleLinkActivation(headerItem);
        }
      });

      headerItem.mobileButton?.addEventListener('click', (ev: Event) => {
        ev.preventDefault();
        this.handleLinkActivation(headerItem);
      });
    },

    handleLinkActivation(headerItem: HeaderItem) {
      this.closeNavMenus(false);
      this.closeSearchMenu();

      if (headerItem.navigationMenu) {
        this.setHeaderExpanded(true, headerItem.navigationMenu);
      }

      headerItem.isActive = true;
      this.enableBackButton(headerItem.link?.innerText);
    },

    handleLinkDeactivation(headerItem: HeaderItem, closeFullMenu: boolean) {
      if (closeFullMenu) {
        this.navMenuOpen = false;
        this.setHeaderExpanded(false);
      }

      headerItem.isActive = false;
      this.disableBackButton();
    },

    headerItemIsActive(itemId: string) {
      const item = this.headerItems.find((item: HeaderItem) => item.id == itemId);
      return item.isActive;
    },

    get isOneLinkActive() {
      return this.headerItems.findIndex((item: HeaderItem) => item.isActive) > -1;
    },

    get isAnyMenuOpen() {
      return this.isOneLinkActive || this.searchMenuOpen;
    },

    setHeaderExpanded(expanded: boolean, innerEl?: HTMLElement) {
      this.headerExpanded = expanded;
      if (expanded) {
        BodyScrollbarStoreAccessor.getStore().hide();
        if (innerEl) {
          this.innerExpandedHeight = `${innerEl.clientHeight}px`;
        }
      }
      else {
        BodyScrollbarStoreAccessor.getStore().reset();
      }
    },

    enableBackButton(text: string) {
      this.mobileBackButtonText = text;
      this.mobileBackButtonEnabled = true;
    },

    disableBackButton() {
      this.mobileBackButtonEnabled = false;
    },

    openMobileMenu() {
      this.navMenuOpen = true;
      this.setHeaderExpanded(true, this.topMenu);
    },

    showTopMenu() {
      this.setHeaderExpanded(true, this.topMenu);
      this.closeNavMenus(false);
    },

    closeNavMenus(closeFullMenu: boolean) {
      if (closeFullMenu) {
        this.navMenuOpen = false;
      }

      this.headerItems.forEach((item: HeaderItem) => {
        if (item.isActive) {
          this.handleLinkDeactivation(item, false);
        }
      });
    },

    openSearchMenu() {
      this.closeNavMenus(true);
      this.setHeaderExpanded(true, this.searchMenu);
      this.searchMenuOpen = true;
    },

    closeSearchMenu() {
      this.searchMenuOpen = false;
    },

    toggleSearchMenu() {
      if (this.searchMenuOpen) {
        this.closeSearchMenu();
        this.setHeaderExpanded(false);
      }
      else {
        this.openSearchMenu();
      }
    },

    closeAllMenus() {
      this.closeNavMenus(true);
      this.closeSearchMenu();
      this.setHeaderExpanded(false);
    },

    hideHeader() {
      this.headerHidden = true;
      this.closeAllMenus();
    },

    showHeader() {
      this.headerHidden = false;
    }
  }
}