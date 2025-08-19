import { AlpineComponent } from "alpinejs";
import { MediaQueryStore, MediaQueryStoreAccessor } from "../../base/alpine/media-query.store";

class FilterBar {
  private readonly el: HTMLElement;

  public values: string[];
  public maximumValuesToDisplay: number;

  public readonly tagContainer: HTMLElement | null;
  private readonly clearAll: HTMLElement | null;
  private tags: NodeListOf<Element> | undefined;

  constructor(el: HTMLElement) {
    this.el = el;

    this.tagContainer = this.el.querySelector('.filter-bar__tag-container');
    this.tags = this.tagContainer?.querySelectorAll('.filter-bar__tag');
    this.clearAll = this.el.querySelector('.filter-bar__clear');
  }

  private removeTag(value: string) {
    this.values = this.values.filter(v => v != value);
    this.clearAllTags();
    this.displayTags();
  }
  
  private addTag(value: string) {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-icon-tag", "btn--small", "filter-bar__tag");
    button.dataset.tagvalue = value;
  
    const span = document.createElement("span");
    span.innerText = value;
    span.classList.add("btn__content", "btn__content--initial");
  
    const wrapper = document.createElement("span");
    wrapper.classList.add("remove-button");
    
    const icon = document.createElement("i");
    icon.classList.add("btn__icon", "fa-sharp", "fa-regular", "fa-times");
  
    if (this.tagContainer != null) {
      this.tagContainer.appendChild(button);
      button.appendChild(span);
      span.appendChild(wrapper);
      wrapper.appendChild(icon);
    }
  }
  
  private addCapNumber(capNumber: number) {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-icon-tag", "btn--small", "filter-bar__tag", "filter-bar__cap-number");
  
    const span = document.createElement("span");
    span.innerText = `+${capNumber}`;
    span.classList.add("btn__content", "btn__content--initial");
  
    if (this.tagContainer != null) {
      this.tagContainer.appendChild(button);
      button.appendChild(span);
    }
  }

  displayTags() {
    const valuesMax = Math.min(this.values.length, this.maximumValuesToDisplay);
    const appropriateCapNumber = this.values.length - this.maximumValuesToDisplay;

    this.values.slice(0, valuesMax).forEach(value => {
      this.addTag(value);
    });
    if (appropriateCapNumber > 0) {
      this.addCapNumber(appropriateCapNumber);
    }
    
    if (this.tagContainer != null) {
      this.tags = this.tagContainer.querySelectorAll('.filter-bar__tag');
      this.tags.forEach(tag => {
        const tagIcon = tag.querySelector(".remove-button");
        if (tagIcon != null) {
          tagIcon.addEventListener("click", () => {
            this.removeTag(tag.attributes.getNamedItem("data-tagvalue")?.value ?? "");
          });
        }
      });
    }
  }

  clearAllTags() {
    if (this.tagContainer != null) {
      this.tagContainer.innerHTML = '';
    }
  }
}

interface FilterBarData {
  filterBar: FilterBar | null;
  handleResize(mediaQueryStore: MediaQueryStore): void;
}

export default function filterBar(values: string[]): AlpineComponent<FilterBarData> {
  return {
    filterBar: null,

    init() {
      this.filterBar = new FilterBar(this.$el);
      this.filterBar.values = values;
      const mediaQueryStore = MediaQueryStoreAccessor.getStore();
      this.handleResize(mediaQueryStore);

      this.filterBar.clearAll.addEventListener("click", () => {
        this.filterBar.clearAllTags();
      })
    },

    handleResize(mediaQueryStore: MediaQueryStore) {
      const isHigherThanMd = mediaQueryStore.matches["md"].up;
      this.filterBar.maximumValuesToDisplay = 12;
      if (!isHigherThanMd) {
        this.filterBar.maximumValuesToDisplay = 5;
      }
      this.filterBar.clearAllTags();
      this.filterBar.displayTags();
    },

    destroy() {
      this.filterBar.clearAllTags();
      this.filterBar = null;
    }
  }
}