import * as React from 'jsx-dom';
import './progress-stepped.scss'

interface ProgressSteppedArgs {
  steps?: number;
  stepsCompleted?: number;
}

export const ProgressStepped = ({
  steps = 7,
  stepsCompleted = 2
}: ProgressSteppedArgs) => {
  const blockClasses = ["progress--stepped"];
  const stepsArray: number[] = [];

  for (let index = 1; index <= steps; index++) {
    stepsArray.push(index);
  }
  
  return <div class={ blockClasses}>
    <div class="progress__steps">
      { stepsArray.map(step => (
        <div class={ stepsCompleted >= step ? "progress__step completed" : "progress__step incomplete" }>
          { stepsCompleted < steps && stepsCompleted == step - 1 
            ? <div class="progress__ball"></div>
            : '' }
        </div>
      ))}
    </div>
  </div>
};
