import * as React from "jsx-dom";
import "./large-card-cta.scss";
import { Button } from "../button/button";
import { ButtonGroup } from "../button-group/button-group";

export interface LargeCardCtaProps {
  title: string;
  description: string;
  ctaPrimaryLabel: string;
  ctaPrimaryUrl: string;
  ctaSecondaryLabel: string;
  ctaSecondaryUrl: string;
}

export const LargeCardCta = ({
  title,
  description,
  ctaPrimaryLabel,
  ctaPrimaryUrl,
  ctaSecondaryLabel,
  ctaSecondaryUrl,
}: LargeCardCtaProps) => {
  return (
    <div class="large-card-cta theme-zone theme--brand">
        <div class="large-card-cta__content">
          <h2 class="large-card-cta__title">{title}</h2>
          <p class="large-card-cta__description">{description}</p>
          <ButtonGroup contextClass="large-card-cta__button-group">
            <Button
              type="primary"
              label={ctaPrimaryLabel}
              href={ctaPrimaryUrl}
            />
            <Button
              type="secondary"
              label={ctaSecondaryLabel}
              href={ctaSecondaryUrl}
            />
          </ButtonGroup>
        </div>
    </div>
  );
};
