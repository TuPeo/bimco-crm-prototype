import * as React from 'jsx-dom';
import { PropsWithChildren } from 'jsx-dom';
import ImageArgs from '../../types/image-args';
import { Button, ButtonProps } from '../../elements/button/button';
import { ButtonGroup } from '../../elements/button-group/button-group';

import './accordion-item.scss';

export interface AccordionItemProps {
  parentId: string;
  id: string;
  collapsed: boolean;
  title: string;
  icon?: string;
  image?: ImageArgs;
  ctas?: ButtonProps[];
}

export const AccordionItem = ({
  parentId,
  id,
  collapsed = true,
  title,
  icon,
  image,
  ctas,
  children
}: PropsWithChildren<AccordionItemProps>) => {
  return (
    <div class="accordion-item">
      <h3 class="accordion-item__header" id={`heading-${id}`}>
        <button
          type="button"
          class={`accordion-item__header-button ${collapsed && 'collapsed'}`}
          data-bs-target={`#collapse-${id}`}
          aria-expanded={collapsed ? 'false' : 'true'}
          aria-controls={`collapse-${id}`}>

          <span class="accordion-item__header-content">
            {icon && <i class={`fa-sharp fa-regular fa-${icon}`} aria-hidden="true"></i>}
            <span class="accordion-item__header-content-text">
              {title}
            </span>
          </span>
          <span class="accordion-item__header-icon-wrapper">
            <i class="accordion-item__header-icon fa-sharp fa-regular fa-plus"></i>
          </span>
        </button>
      </h3>

      <div
        class={`accordion-item__collapse collapse ${!collapsed && 'show'}`}
        id={`collapse-${id}`}
        aria-labelledby={`heading-${id}`}
        data-bs-parent={`#${parentId}`}>

        <div class="accordion-item__body">
          {image &&
            <div class="accordion-item__image-wrapper">
              <picture>
                <img class="accordion-item__image" src={image.url} alt={image.alt} />
              </picture>
            </div>
          }
          <div class="accordion-item__body-content">
            {children}
          </div>
          {ctas && 
            <ButtonGroup contextClass="accordion-item__btn-group">
              { ctas.map(ctaProps => <Button {...ctaProps} />) }
            </ButtonGroup>
          }
        </div>
      </div>
    </div>
  )
}