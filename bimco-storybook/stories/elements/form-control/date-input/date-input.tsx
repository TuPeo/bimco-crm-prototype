import * as React from 'jsx-dom';
import { FormControlMessages, FormControlMessagesProps } from '../form-control-messages/form-control-messages';

import '../form-control.scss'

export interface DateInputProps extends FormControlMessagesProps {
  id?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const DateInput = ({
  id,
  label,
  placeholder,
  disabled,
  message,
  error,
  optional
}: DateInputProps) => {
  const formControlClasses = ['form-control', 'form-control--date-input'];
  const formInputClasses = ['form-control__input'];
  if (error) {
    formInputClasses.push('input-validation-error');
  }

  return <div class={ formControlClasses } x-load x-data="dateInput">
    <label htmlFor={ id } class="form-control__label">{ label }</label>
    <input type="date"
      id={ id }
      class={ formInputClasses }
      placeholder={ placeholder ?? label }
      aria-label={ label }
      disabled={ disabled }
      x-bind:class="{ 'form-control__input--empty': isEmpty }"
      x-on:change="handleChange"
    />
    <FormControlMessages message={ message } error={ error } optional={ optional } />
    <i class="form-control__icon fa-sharp fa-regular fa-calendar" aria-hidden="true"></i>
  </div>
};
