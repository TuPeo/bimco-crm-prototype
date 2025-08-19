import * as React from "jsx-dom";
import LinkArgs from "../../types/link-args";
import "./side-component-navigation-menu.scss";
import { NavigationLink } from "../../elements/navigation-link/navigation-link";

export interface SideComponentNavigationMenuProps {
  parentLink: LinkArgs;
  linksEyebrowText: string;
  links?: LinkArgs[]
  sideComponentEyebrowText: string;
  sideComponent: React.ReactElement;
}

export const SideComponentNavigationMenu = ({ parentLink, linksEyebrowText, links, sideComponentEyebrowText, sideComponent }: SideComponentNavigationMenuProps) => {
  return (
    <div class="side-component-navigation-menu">
      <div class="side-component-navigation-menu__container bimco-container">
        <div class="row">
        <div class="side-component-navigation-menu__parent-link-wrapper">
            <NavigationLink {...parentLink} />
        </div>

        <div class="side-component-navigation-menu__links-col col-12 col-md-6 col-lg-5">
          <div class="side-component-navigation-menu__eyebrow-text side-component-navigation-menu__eyebrow-text--links">{linksEyebrowText}</div>
          <div class="side-component-navigation-menu__links-wrapper">

          {links?.map(link => (
            <NavigationLink {...link} type="sub-page" />
          ))}
        </div>
        </div>

        <div class="side-component-navigation-menu__side-component-col col-12 col-md-6 col-lg-7">
          <div class="side-component-navigation-menu__eyebrow-text side-component-navigation-menu__eyebrow-text--side-component">{sideComponentEyebrowText}</div>

          { sideComponent }
        </div>
      </div>
      </div>
    </div>
  )
}