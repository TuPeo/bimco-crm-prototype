import { AlpineComponent } from 'alpinejs';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SidebarChapterLink {
  anchorEl: HTMLAnchorElement;
  barEl: HTMLElement;
  blockEl: HTMLElement;
  isActive: boolean;
}

interface ChapterLinksData {
  sidebarChapterLinks: SidebarChapterLink[];
  createScrollTriggers(): void;
  toggleActive(element: HTMLElement, active: boolean): void;
  toggleChapterLinks(active: boolean): void;
}

export default function chapterLinks(headerSelector: string, wrapperSelector: string): AlpineComponent<ChapterLinksData> {
  return {
    sidebarChapterLinks: null,

    init() {
      const chapterLinks: SidebarChapterLink[] = Array
        .from((this.$refs.sidebar as HTMLElement).querySelectorAll('.chapter-links__chapter'))
        .map((anchorEl: HTMLAnchorElement) => {
          const blockElId = anchorEl.getAttribute('href').slice(1);
          return {
            anchorEl: anchorEl,
            barEl: document.querySelector(`#chapter-links-bar-${blockElId}`),
            blockEl: document.querySelector(`[data-chapter-link]#${blockElId}`),
            isActive: false
          };
        });

      this.sidebarChapterLinks = chapterLinks;
    },

    createScrollTriggers() {
      const headerEl: HTMLElement = document.querySelector(headerSelector);
      const wrapperEl: HTMLElement = document.querySelector(wrapperSelector);
      const topThreshold = headerEl?.clientHeight + 44;

      this.sidebarChapterLinks.forEach((chapterLink: SidebarChapterLink, index: number) => {
        const endTrigger = this.sidebarChapterLinks[index + 1]?.blockEl || wrapperEl;
        const endTriggerPosition = this.sidebarChapterLinks[index + 1] ? 'top' : 'bottom';

        ScrollTrigger.create({
          trigger: chapterLink.blockEl,
          endTrigger: endTrigger,
          start: `top ${topThreshold}px`,
          end: `${endTriggerPosition} ${topThreshold}px`,
          scrub: true,
          onToggle: (self) => {
            this.toggleActive(chapterLink.anchorEl, self.isActive);
            this.toggleActive(chapterLink.barEl, self.isActive);
          } 
        });
      });

      ScrollTrigger.create({
        trigger: this.$el,
        endTrigger: wrapperEl,
        start: `bottom ${topThreshold}px`,
        end: `bottom ${topThreshold}px`,
        scrub: true,
        onToggle: (self) => {
          this.toggleActive(this.$refs.sidebar, self.isActive);
        } 
      });
    },

    toggleActive(element: HTMLElement, active: boolean) {
      if (active) {
        element?.classList.add('active');
      }
      else {
        element?.classList.remove('active');
      }
    },

    toggleChapterLinks(active: boolean) {
      this.toggleActive(this.$refs.sidebarChapters, active);
    }
  }
}
