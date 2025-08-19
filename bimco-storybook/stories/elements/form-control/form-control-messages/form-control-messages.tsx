import * as React from 'jsx-dom';

import '../form-control.scss'

export interface FormControlMessagesProps {
  message?: string;
  error?: boolean;
  optional?: boolean;
}

export const FormControlMessages = ({
  message,
  error,
  optional
}: FormControlMessagesProps) => {
  const hasMessages = message || optional;

  return hasMessages &&
    <div class="form-control__messages">
      { message && error && <span class="field-validation-error">{ message }</span> }
      { message && <span class="form-control__message">{ message }</span> }
      { optional && <span class="form-control__message form-control__message--indicator">(Optional)</span> }
    </div>
};
