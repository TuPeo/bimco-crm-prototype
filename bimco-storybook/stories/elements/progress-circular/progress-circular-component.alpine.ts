import { AlpineComponent } from "alpinejs";

class ProgressCircular {
  private readonly el: HTMLElement;

  private readonly circleCompleted: HTMLElement;
  private readonly circleIncomplete: HTMLElement;

  private progress: number;
  private direction: number;
  private rotate: number;

  private readonly dashGap: number;
  private readonly strokeWidth: number;
  private readonly circumference: number;

  constructor(el: HTMLElement, size: number, percentCompleted: number, strokeWidthRatio: number) {
    this.el = el;

    this.direction = 1;
    this.rotate = 0;

    this.strokeWidth = size / strokeWidthRatio;
    const diameter = size - this.strokeWidth;
    this.circumference = diameter * Math.PI;
    this.dashGap = strokeWidthRatio / 2;

    this.circleIncomplete = this.el.querySelector('circle.incomplete') as HTMLElement;
    this.circleCompleted = this.el.querySelector('circle.completed') as HTMLElement;

    this.progress = percentCompleted;
  }

  intervalFunction = () => {
    const relativeSpeed = 0.1;
    const rotateFactor = 3;

    if (this.progress > 60 || this.progress < 20) {
      this.direction = 0 - this.direction;
    }
    // this.progress = this.progress + relativeSpeed * this.direction;

    this.rotate = (this.rotate + relativeSpeed * rotateFactor) % 100;

    const completedDash = this.circumference * (100 - (this.progress + 2 * this.dashGap)) / 100;
    let completedStyle = `transform: rotate(${3.6 * this.rotate}deg);`;
    completedStyle += `stroke-dasharray: ${completedDash}px ${this.circumference - completedDash}px;`;

    this.circleCompleted.setAttribute("style", completedStyle);
  }

  setProgressAmount(progress: number) {
    this.progress = progress;
    this.rotate = 0;
  }
}

interface ProgressCircularData {
  progressBar: ProgressCircular | null;
  visible: boolean;
  determinate: boolean;
  progressStyle: string;
  incompleteStyle: string;
  completedStyle: string;
}

export default function progressCircular(percentCompleted: number, determinate: boolean, size: number, strokeWidthRatio: number): AlpineComponent<ProgressCircularData> {
  return {
    progressBar: null,
    visible: false,
    determinate: determinate,
    progressStyle: '',
    incompleteStyle: '',
    completedStyle: '',

    init() {
      this.progressBar = new ProgressCircular(this.$el, size, percentCompleted, strokeWidthRatio);

      const incompleteDash = this.progressBar.circumference * (100 - (percentCompleted + 2 * this.progressBar.dashGap)) / 100;
      const completedDash = this.progressBar.circumference * percentCompleted / 100;

      this.progressStyle = `--size: ${size}; --stroke-width-ratio: ${strokeWidthRatio};`
      this.incompleteStyle = `transform: rotate(${3.6 * (percentCompleted + this.progressBar.dashGap)}deg);`
      this.incompleteStyle += `stroke-dasharray: ${incompleteDash}px ${this.progressBar.circumference - incompleteDash}px;`;
      this.completedStyle = `stroke-dasharray: ${completedDash}px ${this.progressBar.circumference - completedDash}px;`;

      this.visible = true;
    },

    destroy() {
      this.progressBar = null;
    }
  }
}