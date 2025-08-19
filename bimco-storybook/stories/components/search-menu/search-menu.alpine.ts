import { AlpineComponent } from "alpinejs";
import PerfectScrollbar from "perfect-scrollbar";

interface SearchMenuData {
  el: HTMLElement;
  searchBar: HTMLElement;
  searchInput: HTMLInputElement;
  recommendedSearches: HTMLElement;
  isSearchInputActive: boolean;
  isSearchEnabled: boolean;
  submitForm(event: UIEvent): void;
  validateInput(event: UIEvent): void;
  clearInput(): void;
  toggleFocus(focus: boolean): void;
}

export default function SearchMenu(): AlpineComponent<SearchMenuData> {
  return {
    el: null,
    searchBar: null,
    searchInput: null,
    recommendedSearches: null,
    isSearchInputActive: false,
    isSearchEnabled: false,

    init() {
      this.el = this.$el as HTMLElement;
      this.searchBar = this.$refs.searchBar;
      this.searchInput = this.el.querySelector(".form-control__input");
      this.recommendedSearches = this.$refs.recommendedSearches;

      this.searchBar.addEventListener("focusin", () => {
        this.isSearchInputActive = true;
      });

      this.searchBar.addEventListener("focusout", () => {
        this.isSearchInputActive = false;
      });

      if (this.recommendedSearches) {
        new PerfectScrollbar(this.recommendedSearches);
      }
    },

    submitForm(event: UIEvent) {
      const target = event.target as HTMLFormElement
      if (this.isSearchEnabled && this.searchInput.value.trim().length > 0) {
        target.submit();
      }
      else {
        event.preventDefault();
      }
    },

    validateInput(event: UIEvent) {
      const target = event.target as HTMLInputElement;
      if (target.value.trim().length > 0) {
        this.isSearchEnabled = true;
      }
      else {
        this.isSearchEnabled = false;
      }
    },

    clearInput() {
      this.searchInput.value = '';
      this.searchInput.dispatchEvent(new Event('change'));
    },

    toggleFocus(focus: boolean) {
      if (focus) {
        setTimeout(() => {
          this.searchInput.focus({ preventScroll: true });
        }, 600);
      }
      else {
        this.searchInput.blur();
      }
    }
  }
}
