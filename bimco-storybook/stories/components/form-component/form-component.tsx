import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";
import './form-component.scss'

export interface FormComponentProps {
  title: string;
  summary: string;
  theme: string;
}

export const FormComponent = ({
  title,
  summary,
  theme,
  children
}: PropsWithChildren<FormComponentProps>) => {
  const themeClasses = theme && `theme theme--${theme}`;
  const formClasses = ["form-component"];
  formClasses.push(themeClasses);

  return <div class={formClasses}>
    <div class="form-component__header">
      <h3>{title}</h3>
      <p>{summary}</p>
    </div>
    { children }
  </div>
}
