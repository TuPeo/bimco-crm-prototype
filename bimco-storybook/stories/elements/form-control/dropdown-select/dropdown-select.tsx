import * as React from 'jsx-dom';
import { FormControlMessages, FormControlMessagesProps } from '../form-control-messages/form-control-messages';

import '../form-control.scss';

export interface DropdownSelectProps extends FormControlMessagesProps {
  id?: string;
  name?: string;
  values?: string[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
}

export const DropdownSelect = ({
  id,
  values,
  label,
  placeholder = '',
  disabled,
  multiple,
  message,
  error,
  optional
}: DropdownSelectProps) => {
  const formControlClasses = ['form-control', 'form-control--dropdown-select'];

  return <div class={formControlClasses}>
    <label htmlFor={ id } class="form-control__label">{ label }</label>
    <div class="form-control__input"
      x-load
      x-data={ `choicesSelect('${placeholder}')` }>
      <select class="form-control__select"
        id={ id }
        name={ id }
        multiple={ multiple } 
        disabled={ disabled }>
        {values.map(value =>
          <option>{value}</option>
        )}
      </select>
    </div>
    <FormControlMessages message={ message } error={ error } optional={ optional } />
    <i class="form-control__icon fa-sharp fa-solid fa-chevron-down" aria-hidden="true"></i>
  </div>
};
