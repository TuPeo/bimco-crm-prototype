import * as React from "jsx-dom";
import LinkArgs from "../../types/link-args";
import { Button, ButtonProps } from "../../elements/button/button";
import { ButtonGroup } from "../../elements/button-group/button-group";

import "./quick-links.scss";

interface QuickLink {
  link: LinkArgs;
  icon: string;
}

export interface QuickLinksProps {
  eyebrowText: string;
  text: string;
  callToActions: ButtonProps[];
  quickLinks: QuickLink[];
}

export const QuickLinks = ({ eyebrowText, text, callToActions, quickLinks }: QuickLinksProps) => {
  return (
    <div class="quick-links">
      <div class="bimco-container bimco-container--inset-xxxl">
        <div class="quick-links__row">
          <div class="quick-links__text-col">
            <div class="quick-links__text rich-text">
              <p>
                <span class="eyebrow">{eyebrowText}</span>
              </p>
              <h2 class="headline-4">{text}</h2>
            </div>
            {callToActions && <ButtonGroup contextClass="quick-links__btn-group">
              { callToActions.map(ctaProps => <Button {...ctaProps} />) }
            </ButtonGroup>}
          </div>

          <div class="quick-links__links-col">
            {quickLinks && quickLinks.map(quickLink => (
              <a class="quick-links__link" href={quickLink.link.url}>
                <span class="quick-links__link-text">{quickLink.link.label}</span>
                <i class={`quick-links__link-icon fa-sharp fa-regular fa-${quickLink.icon}`} aria-hidden="true"></i>
                <i class="quick-links__link-pip" aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}