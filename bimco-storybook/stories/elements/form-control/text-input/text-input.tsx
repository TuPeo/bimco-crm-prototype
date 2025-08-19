import * as React from 'jsx-dom';
import { FormControlMessages, FormControlMessagesProps } from '../form-control-messages/form-control-messages';

import '../form-control.scss'

export interface TextInputProps extends FormControlMessagesProps {
  elementType?: 'input' | 'textarea';
  id?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  password?: boolean;
}

export const TextInput = ({
  elementType = 'input',
  id,
  label,
  placeholder,
  disabled,
  password,
  message,
  error,
  optional
}: TextInputProps) => {
  const formControlClasses = ['form-control'];
  formControlClasses.push(elementType == 'textarea' ? 'form-control--textarea' : 'form-control--text-input');
  const formInputClasses = ['form-control__input'];
  if (error) {
    formInputClasses.push('input-validation-error');
  }

  return <div class={ formControlClasses }>
    <label htmlFor={ id } class="form-control__label">{ label }</label>
    { elementType == 'textarea' && <textarea
      id={ id }
      class={ formInputClasses }
      placeholder={ placeholder ?? label }
      aria-label={ label }
      disabled={ disabled }>
    </textarea> }
    { elementType == 'input' && <input type={ password ? 'password' : 'text' }
      id={ id }
      class={ formInputClasses }
      placeholder={ placeholder ?? label }
      aria-label={ label }
      disabled={ disabled }
    /> }
    <FormControlMessages message={ message } error={ error } optional={ optional } />
  </div>
};
