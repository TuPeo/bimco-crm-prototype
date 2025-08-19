import * as React from "jsx-dom";
import LinkArgs from "../../types/link-args";
import "./navigation-link.scss";

export interface NavigationLinkProps extends LinkArgs {
  contextClass?: string;
  type?: "landing-page" | "sub-page" | "root-link";
}

export const NavigationLink = ({label, url, contextClass, type = "landing-page"}: NavigationLinkProps) => {
  return (
    <a class={`${contextClass ?? ""} navigation-link navigation-link--${type}`} href={url}>
      { label }

      <i class="navigation-link__chevron fa-sharp fa-solid fa-chevron-right" aria-hidden="true"></i>
    </a>
  )
}