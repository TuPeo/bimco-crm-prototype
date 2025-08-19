import * as React from 'jsx-dom';
import ImageArgs from '../../types/image-args';
import { Button } from '../../elements/button/button';
import { BimcoModal } from '../bimco-modal/bimco-modal';
import { v4 as uuidV4 } from 'uuid';

import './contact-card.scss';

export interface ContactCardProps {
  image?: ImageArgs;
  name: string;
  headline?: string;
  subText?: string;
  email: string;
  phoneNum: string;
  bio?: string;
}

export const ContactCard = ({
  image,
  name,
  headline,
  subText,
  bio,
  email,
  phoneNum
}: ContactCardProps) => {
  const modalId = `contactModal_${uuidV4()}`;
  const modalTriggerData: Record<string, string> = { 'data-bs-toggle': 'modal', 'data-bs-target': `#${modalId}` };

  return (
    <div class="contact-card"
      x-load
      x-data="contactCard">

      <div class="contact-card__row">
        <div class="contact-card__image-col">
          { image && <img class="contact-card__image" src={image.url} alt={image.alt} /> }
        </div>

        <div class="contact-card__content-col">
          <div class="contact-card__content">
            { headline && <span class="contact-card__headline">{headline}</span> }
            <h3 class="contact-card__name">{name}</h3>
            { subText && <span class="contact-card__subtext">{subText}</span> }
          </div>

          <div class="contact-card__links">
            { bio && <Button type="icon-subtle" iconStyle="solid" iconBefore="circle-info" data={modalTriggerData} /> }
            { email && <Button type="icon-subtle" iconStyle="solid" iconBefore="envelope" href={`mailto:${email}`} /> }
            { phoneNum && <Button type="icon-subtle" iconStyle="solid" iconBefore="phone" href={`tel:${phoneNum}`} /> }
          </div>
        </div>
      </div>

      { bio && 
        <BimcoModal id={modalId} xRef="contactCardModal">
          <div class="modal-header">
            <h2 class="bimco-modal__heading" id={`${modalId}_ModalLabel`}>{ name }</h2>
          </div>
          <div class="modal-body">
            <div class="rich-text">
              <p>{ bio }</p>
            </div>
          </div>
        </BimcoModal>
      }
    </div>
  )
}
