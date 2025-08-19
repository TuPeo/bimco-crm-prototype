import * as React from 'jsx-dom';
import { FormControlMessages, FormControlMessagesProps } from '../form-control-messages/form-control-messages';

import '../form-control.scss';

export interface CheckboxRadioListProps extends FormControlMessagesProps {
  inputType?: 'checkbox' | 'radio';
  id?: string;
  label?: string;
  items?: {
    value: string;
    disabled: boolean;
  }[];
  layout?: 'vertical' | 'horizontal';
}

export const CheckboxRadioList = ({
  inputType = 'checkbox',
  id,
  label,
  items,
  layout = 'vertical',
  message,
  error,
  optional
}: CheckboxRadioListProps) => {
  const formControlClasses = ['form-control'];
  formControlClasses.push(`form-control--${inputType}-list`)
  const formInputClasses = ['form-control__input'];
  if (error) {
    formInputClasses.push('input-validation-error');
  }
  const formInputLabelClasses = ['form-control__input-label'];
  formInputLabelClasses.push(`form-control__input-label--${inputType}`)

  return <fieldset class={ formControlClasses }>
    <legend class="form-control__label">{ label }</legend>
    <ul class={`form-control__input-list form-control__input-list--${layout}`}>
      { items.map((item, index) => {
        const itemId = `${id}-${index}`;
        return <li class="form-control__input-item">
            <input type={ inputType }
                class={ formInputClasses }
                name={ id }
                id={ itemId }
                value={ item.value }
                disabled={ item.disabled } />
          <label class={ formInputLabelClasses } htmlFor={ itemId }>{ item.value }</label>
        </li>
      }) }
    </ul>
    <FormControlMessages message={ message } error={ error } optional={ optional } />
  </fieldset>
};
