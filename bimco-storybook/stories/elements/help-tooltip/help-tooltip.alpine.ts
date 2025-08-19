import { AlpineComponent } from "alpinejs";
import { Tooltip } from "bootstrap";

interface HelpTooltipData {
  tooltip: Tooltip | null;
}

export default function helpTooltip(): AlpineComponent<HelpTooltipData> {
  return {
    tooltip: null,

    init() {
      this.tooltip = new Tooltip(this.$el);
    },

    destroy() {
      this.tooltip = null;
    }
  };
}
