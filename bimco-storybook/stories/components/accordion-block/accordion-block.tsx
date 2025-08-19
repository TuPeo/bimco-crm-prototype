import * as React from 'jsx-dom';
import { PropsWithChildren } from 'jsx-dom';
import { AccordionItemProps } from '../accordion-item/accordion-item';
import { BimcoModal } from '../bimco-modal/bimco-modal';

import './accordion-block.scss';

export interface AccordionBlockProps {
  id: string;
  items: Array<AccordionItemProps>
  modal: boolean;
}

export const AccordionBlock = ({
  id,
  modal,
  children
}: PropsWithChildren<AccordionBlockProps>) => {
  return (
    <div
      class="accordion-block__wrapper"
      x-load 
      x-data="accordionBlock">

      <div class="accordion-block" id={id}>
        {children}
      </div>

      {modal &&
        <BimcoModal id={`${id}_Modal`} scrollable={true} theme="white" xRef="accordionModal">
          <div class="modal-header">
            <h3 class="accordion-item__header" id={`${id}_ModalLabel`} x-html="accordionModalHeader"></h3>
          </div>
          <div class="modal-body" x-html="accordionModalBody"></div>
        </BimcoModal>
      }
    </div>
  )
}