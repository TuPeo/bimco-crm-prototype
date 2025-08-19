import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";
import "./inset-cta.scss";
import { ButtonGroup } from "../../elements/button-group/button-group";
import { Button, ButtonProps } from "../../elements/button/button";
import ImageArgs from "../../types/image-args";
import { ThemeName } from "../../types/theme-name";

export interface InsetCtaProps {
  index?: number;
  contextClass?: string;
  background?: ImageArgs;
  wash?: boolean;
  theme?: ThemeName;
  ctas?: ButtonProps[];
}

export const InsetCta = ({
  index,
  contextClass,
  background,
  wash = false,
  theme,
  ctas,
  children
}: PropsWithChildren<InsetCtaProps>) => {
  const themeClass = theme ? `theme--${theme}` : "theme-inverse";

  return (
    <div key={index} class={contextClass}>
      <div className={`inset-cta theme-zone ${themeClass}`}>
        {background && (
          <div className={`inset-cta__background ${wash && "inset-cta__background--wash"}`}>
            <picture>
              <img className="inset-cta__background-image" src={background.url} alt={background.alt} />
            </picture>
          </div>
        )}
        <div className="inset-cta__content">
          <div className="rich-text">
            {children}
          </div>

          {ctas && <ButtonGroup contextClass="inset-cta__btn-group">
            { ctas.map(ctaProps => <Button {...ctaProps} />) }
          </ButtonGroup>}
        </div>
      </div>
    </div>
  );
};
