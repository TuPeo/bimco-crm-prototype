import * as React from 'jsx-dom';
import './progress-linear.scss'
import { Fragment } from 'jsx-dom';

interface ProgressLinearArgs {
  determinate?: boolean;
  percentCompleted?: number;
}

export const ProgressLinear = ({
  determinate = false,
  percentCompleted = 50
}: ProgressLinearArgs) => {
  const blockClasses = ["progress--linear"];
  if (!determinate) {
    blockClasses.push("indeterminate");
  }

  return <div class={ blockClasses} x-load="visible"
    x-data={ `progressLinear(${percentCompleted}, ${determinate})` }>
      <div class="progress__steps">
        { determinate && <Fragment>
          <div class="progress__step completed"></div>
          { percentCompleted < 100 && <div class="progress__step">
            <div class="progress__ball"></div>
          </div> }
        </Fragment>}
        { !determinate && <Fragment>
          <div class="progress__step progress__step--one"></div>
          <div class="progress__step progress__step--two"></div>
          <div class="progress__step progress__step--three"></div>
        </Fragment>}
      </div>
  </div>
};
