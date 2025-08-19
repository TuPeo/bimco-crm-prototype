import * as React from "jsx-dom";
import LinkArgs from "../../types/link-args";
import "./standard-navigation-menu.scss";
import { NavigationLink } from "../../elements/navigation-link/navigation-link";

interface StandardNavigationLinkSet {
  parentLink: LinkArgs;
  childLinks: LinkArgs[];
}
export interface StandardNavigationMenu {
  linkSets?: StandardNavigationLinkSet[];
}

export const StandardNavigationMenu = ({ linkSets }: StandardNavigationMenu) => {
  return (
    <div class="standard-navigation-menu">
      <div class="standard-navigation-menu__container bimco-container">
        <NavigationLink url="/" label="Explore all" contextClass="standard-navigation-menu__root-link" type="root-link" />

        <div class="standard-navigation-menu__link-sets">
          {linkSets?.map(linkSet => (
            <div class="standard-navigation-menu__link-set">
              <NavigationLink {...linkSet.parentLink} type="landing-page" />
              
              <div class="standard-navigation-menu__child-links">
                {linkSet.childLinks.map(link => (
                  <NavigationLink {...link} type="sub-page"/>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}