import * as React from 'jsx-dom';
import './progress-circular.scss'

interface ProgressCircularArgs {
  determinate?: boolean;
  percentCompleted?: number;
  circleSizeInPixels?: number;
  strokeWidthRatio?: number;
}

export const ProgressCircular = ({
  determinate = false,
  percentCompleted = 50,
  circleSizeInPixels = 150,
  strokeWidthRatio = 12
}: ProgressCircularArgs) => {
  const blockClasses = ["progress--circular"];
  if (!determinate) {
    blockClasses.push("progress--indeterminate");
  }

  return <div class={ blockClasses} x-load="visible"
    x-data={ `progressCircular(${percentCompleted}, ${determinate}, ${circleSizeInPixels}, ${strokeWidthRatio})` }
    x-bind:class="{ 'progress--indeterminate': !determinate, 'progress--hidden': !visible }"
    x-bind:style="progressStyle">
      <svg class="progress__circle">
        {determinate && <circle class="incomplete" x-bind:style="incompleteStyle"></circle>}
        <circle class="completed" x-bind:style="completedStyle"></circle>
      </svg>
  </div>
};
