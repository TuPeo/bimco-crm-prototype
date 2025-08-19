import { AlpineComponent } from 'alpinejs';
import Choices from 'choices.js';

class ChoicesSelect {
  private readonly el: Element;
  public choices: Choices;

  constructor(el: Element, placeholder: string) {
    this.el = el;
    if (placeholder && placeholder != '') {
      this.choices = new Choices(this.el, {
        searchEnabled: false,
        searchChoices: false,
        shouldSort: false,
        itemSelectText: '',
        placeholder: true,
        placeholderValue: placeholder
      });
    }
    else {
      this.choices = new Choices(this.el, {
        searchEnabled: false,
        searchChoices: false,
        shouldSort: false,
        itemSelectText: ''
      });
    }
  }
}

interface ChoicesSelectData {
  choicesSelect: ChoicesSelect | null;
  setValue(value: string): void;
}

export default function choicesSelect(placeholder: string): AlpineComponent<ChoicesSelectData> {
  return {
    choicesSelect: null,

    init() {
      const selectEl = this.$el.querySelector('select');
      this.choicesSelect = new ChoicesSelect(selectEl, placeholder);
    },

    setValue(value: string) {
      this.choicesSelect.choices.setChoiceByValue(value);
    }
  }
}
