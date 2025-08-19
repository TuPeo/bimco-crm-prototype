import { AlpineComponent } from "alpinejs";

class ProgressLinear {
  private readonly el: HTMLElement;

  private readonly stepCompleted: Element;
  private readonly stepIncomplete: Element;
  private readonly stepOne: Element;
  private readonly stepTwo: Element;
  private readonly stepThree: Element;

  private progress: number;
  private direction: number;
  private rotate: number;
  private splitblock: boolean;
  private firstbreak: number;
  private secondbreak: number;
  
  constructor(el: HTMLElement, percentCompleted: number, determinate: boolean) {
    this.el = el;

    this.direction = 1;
    this.rotate = 0;
    this.splitblock = false;

    const steps = this.el.querySelectorAll('.progress__step');
    if (determinate) {
      this.stepCompleted = steps[0];
      this.stepIncomplete = steps[1];
    }
    else {
      this.stepOne = steps[0];
      this.stepTwo = steps[1];
      this.stepThree = steps[2];
    }

    this.progress = percentCompleted;
    this.firstbreak = 0;
    this.secondbreak = percentCompleted;
  }

  intervalFunction = () => {
    const relativeSpeed = 0.1;
    const rotateFactor = 3;

    if (this.progress > 70 || this.progress < 30) {
      this.direction = 0 - this.direction;
    }
    this.progress = this.progress + relativeSpeed * this.direction;

    this.rotate = (this.rotate + relativeSpeed * rotateFactor) % 100;

    this.splitblock = this.rotate + this.progress >= 100;

    this.firstbreak = this.splitblock ? this.rotate + this.progress - 100 : this.rotate;
    this.secondbreak = this.splitblock ? this.rotate : this.rotate + this.progress;

    this.stepOne.setAttribute("style", `flex: ${this.splitblock ? this.rotate + this.progress - 100 : this.rotate}`);
    this.stepTwo.setAttribute("style", `flex: ${this.secondbreak - this.firstbreak}`);
    this.stepThree.setAttribute("style", `flex: ${100 - this.secondbreak}`);

    if (this.splitblock) {
      this.stepOne?.classList.add('completed');
      this.stepTwo?.classList.remove('completed');
      this.stepThree?.classList.add('completed');
    }
    else {
      this.stepOne?.classList.remove('completed');
      this.stepTwo?.classList.add('completed');
      this.stepThree?.classList.remove('completed');
    }
  }

  setProgressAmount(progress: number) {
    this.progress = progress;
    this.rotate = 0;
  }
}

interface ProgressLinearData {
  progressBar: ProgressLinear | null;
}

export default function progressLinear(percentCompleted: number, determinate: boolean): AlpineComponent<ProgressLinearData> {
  return {
    progressBar: null,

    init() {
      this.progressBar = new ProgressLinear(this.$el, percentCompleted, determinate);
      if (determinate) {
        this.progressBar.stepCompleted.setAttribute("style", `flex: ${percentCompleted}`);
        if (this.progressBar.stepIncomplete) {
          this.progressBar.stepIncomplete.setAttribute("style", `flex: ${100 * (1 - percentCompleted / 100)}`);
        }
      }
      else {
        setInterval(() => { this.progressBar.intervalFunction() }, 1);
      }
    },

    destroy() {
      this.progressBar = null;
    }
  }
}