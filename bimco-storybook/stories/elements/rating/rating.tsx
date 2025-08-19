import * as React from 'jsx-dom';
import '../form-control/form-control.scss'
import './rating.scss'

interface RatingArgs {
  name: string;
  values: string[];
  label?: string;
  message?: string;
  disabled?: boolean;
}

export const Rating = ({
  name,
  values,
  label,
  message,
  disabled
}: RatingArgs) => {
  const formControlClasses = ["form-control rating"];
  if (disabled) {
    formControlClasses.push("disabled");
  }

  return <>
    <div class={formControlClasses}>
      {label && <label class="form-control__label">{label}</label>}
      <div class="form-control__wrapper">
        {values.map(value =>
          <div class="form-control__input-wrapper">
            <input type="radio"
              tabIndex={0}
              aria-label={name}
              name={name}
              disabled={disabled}
              class="form-control__input" />
            <div class="form-control__input-name"
              tabIndex={-1}>{ value }</div>
          </div>
        )}
      </div>
    </div>
    {message && <div class="form-control__message">{message}</div>}
  </>
};
