import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";
import { ProgressStepped } from '../../elements/progress-stepped/progress-stepped';
import { Button } from '../../elements/button/button';

import './form-step.scss';

export interface FormStepProps {
  stepname?: string,
  steps?: number,
  stepsCompleted?: number,
}

export const FormStep = ({
  stepname = '',
  steps,
  stepsCompleted,
  children
}: PropsWithChildren<FormStepProps>) => {
  return (
    <div class="form-step">
      { steps && stepsCompleted &&
        <div class="form-step__header">
          <div class="form-step__step-number">Step {stepsCompleted + 1}</div>
          <div class="form-step__step-name">{stepname}</div>
          <div class="form-step__progress">
            <span>{stepsCompleted} of {steps} steps completed</span>
            <ProgressStepped steps={steps} stepsCompleted={stepsCompleted} />
          </div>
        </div>
      }
      <fieldset class="form-step__fieldset">
        { children }
      </fieldset>
      { steps && stepsCompleted &&
        <div class="form-step__navigation">
          { stepsCompleted < steps - 1 && <Button type="primary" label="Continue"></Button> }
          { stepsCompleted > 0 && <Button type="secondary" label="Go back"></Button> }
        </div>
      }
    </div>
  )
}
