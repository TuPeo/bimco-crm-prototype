import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";
import { BimcoModal } from "../bimco-modal/bimco-modal";

export interface FormModalProps {
  title: string;
  summary: string;
  theme: string;
}

export const FormModal = ({
  title,
  summary,
  theme,
  children
}: PropsWithChildren<FormModalProps>) => {
  const themeClasses = theme && `theme theme--${theme}`;
  const formClasses = ["form-modal modal"];
  formClasses.push(themeClasses);

  return (
    <>
      <button type="button" data-bs-toggle="modal" data-bs-target="#formModal">
        Open Form Modal
      </button>
      <BimcoModal id="formModal">
        <div class="form-modal__header">
          <h3>{title}</h3>
          <p>{summary}</p>
        </div>
        { children }
      </BimcoModal>
    </>
  )
}

