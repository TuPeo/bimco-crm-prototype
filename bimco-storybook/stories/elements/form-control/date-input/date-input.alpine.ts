import { AlpineComponent } from 'alpinejs';

interface DateInputData {
  isEmpty: boolean;
  handleChange(): void;
}

export default function dateInput(): AlpineComponent<DateInputData> {
  return {
    isEmpty: true,

    handleChange() {
      const inputEl: HTMLInputElement = this.$el;
      this.isEmpty = !inputEl.value?.length;

      console.log('handleChange', inputEl.value, this.isEmpty);
    }
  }
}