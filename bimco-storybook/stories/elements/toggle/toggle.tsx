import * as React from 'jsx-dom';
import '../form-control/form-control.scss'
import './toggle.scss'

interface ToggleArgs {
  id: string;
  name: string;
  variant: "default" | "small";
  label?: string;
  disabled?: boolean;
}

export const Toggle = ({
  id,
  name,
  variant,
  label,
  disabled
}: ToggleArgs) => {
  const formControlClasses = ["form-control toggle"];
  if (disabled) {
    formControlClasses.push("disabled");
  }
  if (variant != "default") {
    formControlClasses.push(variant);
  }

  return <>
    <div class={formControlClasses}>
      {label && <label class="form-control__label" htmlFor={id}>{label}</label>}
      <div class="form-control__input-wrapper">
        <input type="checkbox"
          id={id}
          aria-label={name}
          name={name}
          disabled={disabled}
          class="form-control__input" />
        <div class="form-control__input-handle"></div>
      </div>
    </div>
  </>
};
