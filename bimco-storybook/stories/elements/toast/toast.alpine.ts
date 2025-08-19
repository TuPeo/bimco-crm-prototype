import { AlpineComponent } from "alpinejs";

interface ToastData {
  el: HTMLElement;
  visible: boolean;
  showToast: () => void;
  hideToast: () => void;
  toggleToast: () => void;
}

export default function toastComponent(): AlpineComponent<ToastData> {
  return {
    visible: true, // Controls whether the toast is visible or not
    el: null, // Reference to the toast element

    showToast() {
      this.visible = true;
    },

    hideToast() {
      this.visible = false;
    },

    toggleToast() {
      this.visible = !this.visible;
    },
    init() {
      this.el = this.$el as HTMLElement;
    },
  };
}
