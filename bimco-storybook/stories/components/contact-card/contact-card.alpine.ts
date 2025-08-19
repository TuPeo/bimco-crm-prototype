import { AlpineComponent } from 'alpinejs';
import Modal from 'bootstrap/js/dist/modal';

interface ContactCardData {
  modal: {
    el?: HTMLElement;
    modal?: Modal;
  }
}

export default function contactCard(): AlpineComponent<ContactCardData> {
  return {
    modal: {},

    init() {
      if (this.$refs.contactCardModal) {
        this.modal = {
          el: this.$refs.contactCardModal,
          modal: new Modal(this.$refs.contactCardModal)
        }
      }
    }
  }
}
