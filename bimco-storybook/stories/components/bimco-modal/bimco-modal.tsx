import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";
import { ThemeName } from "../../types/theme-name";

import "./bimco-modal.scss";

export interface BimcoModalProps {
  id: string;
  scrollable?: boolean;
  theme?: ThemeName;
  contextClass?: string;
  xRef?: string;
}

export const BimcoModal = ({
  id,
  scrollable,
  theme = 'white',
  contextClass,
  xRef,
  children
}: PropsWithChildren<BimcoModalProps>) => {
  let modalClasses = ["bimco-modal modal fade"];

  modalClasses = contextClass ? [...modalClasses, contextClass] : modalClasses;

  return (
    <div
      class={modalClasses} 
      id={id} 
      tabIndex={-1} 
      aria-labelledby={`${id}Label`} 
      aria-hidden="true" 
      x-ref={xRef}>

      <div class={`modal-dialog ${scrollable && 'modal-dialog-scrollable'}`}>
        <div class={`modal-content theme-zone theme--${theme}`}>
          <button
            type="button" 
            class="btn btn-icon-subtle bimco-modal__close" 
            data-bs-dismiss="modal" 
            aria-label="Close">
            <span class="btn__content">
              <i class="fa-sharp fa-solid fa-times" aria-hidden="true"></i>
            </span>
          </button>
          <div class="bimco-modal__content">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
