import * as React from 'jsx-dom';

import '../form-control.scss';

export interface SimpleSelectProps {
  id?: string;
  values?: string[];
  disabled?: boolean;
}

export const SimpleSelect = ({
  id,
  values,
  disabled,
}: SimpleSelectProps) => {
  const formControlClasses = ['form-control', 'form-control--simple-select'];

  return <div class={formControlClasses}>
    <div class="form-control__input"
      x-load
      x-data="choicesSelect">
      <select class="form-control__select"
        id={ id }
        name={ id }
        disabled={ disabled }>
        {values.map(value =>
          <option>{value}</option>
        )}
      </select>
    </div>
    <i class="form-control__icon fa-sharp fa-solid fa-chevron-down" aria-hidden="true"></i>
  </div>
};
