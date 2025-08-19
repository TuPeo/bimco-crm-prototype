import * as React from 'jsx-dom';
import { FormControlMessages, FormControlMessagesProps } from '../form-control-messages/form-control-messages';

import '../form-control.scss';

export interface CheckboxInputProps extends FormControlMessagesProps {
  id?: string;
  label?: string;
  disabled?: boolean;
}

export const CheckboxInput = ({
  id,
  label,
  disabled,
  message,
  error,
  optional
}: CheckboxInputProps) => {
  const formControlClasses = ['form-control', 'form-control--checkbox-input'];
  const formInputClasses = ['form-control__input'];
  if (error) {
    formInputClasses.push('input-validation-error');
  }

  return <div class={ formControlClasses }>
    <label htmlFor={ id } class="form-control__input-label form-control__input-label--checkbox">{ label }</label>
    <input type="checkbox"
      id={ id }
      name={ id }
      class={ formInputClasses }
      disabled={ disabled } />
    <FormControlMessages message={ message } error={ error } optional={ optional } />
  </div>
};
