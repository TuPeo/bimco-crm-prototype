import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";
import ImageArgs from "../../types/image-args";
import "./page-hero.scss";

interface PageHeroProps {
  title: string;
  description: string;
  style: string;
  background?: ImageArgs;
  wash?: boolean;
}

export const PageHero = ({
  title = "Page title goes in here",
  description = "",
  style = "default",
  background,
  wash = true,
  children
}: PropsWithChildren<PageHeroProps>) => {
  if (description === "") {
    style = "simple";
  }
  return (
    <div class={`page-hero page-hero--${style}`}>
      {background && (
        <div class={`page-hero__background ${wash && "page-hero__background--wash"}`}>
          <picture>
            <img class="page-hero__background-image" src={background.url} alt={background.alt} />
          </picture>
        </div>
      )}
      <div class="page-hero__container bimco-container">
        {children}
        <h1 class="page-hero__title">
          {title}
        </h1>
        {description && <div className="row justify-content-end">
          <div className="col-12 col-md-8 col-lg-6">
            <div class="rich-text">
              {description}
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};
