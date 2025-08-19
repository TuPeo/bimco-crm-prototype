import { AlpineComponent } from 'alpinejs';
import Collapse from 'bootstrap/js/dist/collapse';
import Modal from 'bootstrap/js/dist/modal';

interface AccordionItem {
  itemEl: HTMLElement;
  toggleEl: HTMLElement;
  collapseEl: HTMLElement;
  collapse?: Collapse;
  expanded?: boolean;
  headerHtml?: string;
  bodyHtml?: string;
}

class Accordion {
  private _el: HTMLElement;
  private _modalEl: HTMLElement;
  private _modal: Modal;
  private _itemList: Array<AccordionItem>;
  private _updateStatus: CallableFunction;

  constructor(el: HTMLElement, modalEl: HTMLElement, updateStatus: CallableFunction) {
    this._el = el;
    this._modalEl = modalEl;
    this._updateStatus = updateStatus;

    const itemElements = el.querySelectorAll<HTMLElement>('.accordion-item');
    this._itemList = Array.from(itemElements).map(itemEl => {
      const item: AccordionItem = {
        itemEl: itemEl,
        toggleEl: itemEl.querySelector('.accordion-item__header-button'),
        collapseEl: itemEl.querySelector('.accordion-item__collapse'),
        expanded: false
      }

      return item;
    });

    this.createAccordion();
  }

  get expandedItem() {
    return this._itemList.find(item => item.expanded);
  }

  createAccordion() {
    if (this._modalEl) {
      this._modal = new Modal(this._modalEl);

      this._modalEl.addEventListener('hidden.bs.modal', () => {
        this._itemList.forEach((item: AccordionItem) => {
          item.expanded = false;
        });
        this._updateStatus();
      });

      this._itemList.forEach((item: AccordionItem) => {
        item.headerHtml = item.itemEl.querySelector('.accordion-item__header-content').outerHTML;
        item.bodyHtml = item.itemEl.querySelector('.accordion-item__body').innerHTML;
        item.toggleEl.addEventListener('click', () => {
          item.expanded = true;
          this._updateStatus();
          this._modal.show();
        });
      });
    }
    else {
      this._itemList.forEach((item: AccordionItem) => {
        item.toggleEl.setAttribute('data-bs-toggle', 'collapse');
        item.collapse = new Collapse(item.collapseEl, {
          parent: this._el,
          toggle: false
        });
        item.collapseEl.addEventListener('shown.bs.collapse', () => {
          item.itemEl.scrollIntoView();
        });
      });
    }
  }
}

interface AccordionBlockData {
  accordion: Accordion;
  accordionModalHeader: string;
  accordionModalBody: string;
  updateStatus(): void;
}

export default function accordionBlock(): AlpineComponent<AccordionBlockData> {
  return {
    accordion: null,
    accordionModalHeader: '',
    accordionModalBody: '',

    init() {
      this.accordion = new Accordion(this.$el, this.$refs.accordionModal, () => { this.updateStatus() });
    },

    updateStatus() {
      this.accordionModalHeader = this.accordion.expandedItem?.headerHtml;
      this.accordionModalBody = this.accordion.expandedItem?.bodyHtml;
    }
  };
}
