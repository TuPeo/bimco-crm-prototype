import * as React from "jsx-dom";
import LinkArgs from "../../types/link-args";

import "./bimco-header.scss";
import { Button, ButtonProps } from "../../elements/button/button";
import { ButtonGroup } from "../../elements/button-group/button-group";
import { SearchMenu } from "../search-menu/search-menu";
import { BimcoLogo } from "../../elements/bimco-logo/bimco-logo";

interface LinkWithNavMenu extends LinkArgs {
  navigationMenu?: React.ReactElement;
}

interface BimcoHeaderTopLinkProps {
  link: LinkWithNavMenu;
  index: string;
}

export interface BimcoHeaderProps {
  topLinks?: LinkWithNavMenu[];
  isLoggedIn?: boolean;
  scrollIndicator?: boolean;
}

const BimcoHeaderTopLink = ({link, index}: BimcoHeaderTopLinkProps) => {
  const navigationMenuId = `navigation-menu-${index}`;
    return (
      <div
        class="bimco-header__top-link-wrapper"
        data-menu-id={index}
        x-bind:class={`{ 'bimco-header__top-link-wrapper--active': headerItemIsActive('${index}') }`}>

        <a class="bimco-header__top-link bimco-header__top-link--desktop-link" 
          href={link.url}>
          
          {link.label}

          {link.navigationMenu && <i class="bimco-header__top-link-chevron fa-sharp fa-regular fa-chevron-down" aria-hidden="true"></i> }
        </a>

        <button class="bimco-header__top-link bimco-header__top-link--mobile-button">
          
          {link.label}

        </button>

        {link.navigationMenu && <div id={navigationMenuId}
          class={`bimco-header__navigation-menu-container`} role="dialog">
          
          {link.navigationMenu}

        </div> }
    </div>
    )
}

export const BimcoHeader = ({
  topLinks,
  isLoggedIn,
  scrollIndicator = false
}: BimcoHeaderProps) => {
  const primaryBtnProps: Partial<ButtonProps> = isLoggedIn ? {label: "MyBIMCO", iconStyle: "solid", iconBefore: "circle-user"}: { label: "Register" };
  const secondaryBtnProps: Partial<ButtonProps> = isLoggedIn ? {label: "Logout", iconStyle: "solid", iconAfter: "right-from-bracket"} : { label: "Log in" };

  return (
    <div class={`bimco-header theme theme--${isLoggedIn ? "light" : "dark"}`}
      x-load 
      x-data={`bimcoHeader(${scrollIndicator})`}
      x-bind:class="{'bimco-header--header-expanded': headerExpanded, 
      'bimco-header--navigation-menu-open': navMenuOpen,
      'bimco-header--search-menu-open': searchMenuOpen,
      'bimco-header--hidden': headerHidden }"
      x-bind:style="{ '--bimco-header-inner-expanded-height': innerExpandedHeight }">

      <div class="bimco-header__supergraphic bimco-header__supergraphic--left" x-ref="supergraphicLeft"></div>
      <div class="bimco-header__supergraphic bimco-header__supergraphic--right" x-ref="supergraphicRight"></div>

      <div class="bimco-header__content-wrapper" x-ref="contentWrapper">
        <div class="bimco-header__container bimco-container">
          <div class="bimco-header__top">
            <a class="bimco-header__logo" 
              href="/" 
              title="BIMCO Homepage" 
              aria-label="BIMCO Homepage"
              x-bind:class="{ 'bimco-header__logo--hidden': mobileBackButtonEnabled }">
              <BimcoLogo />
            </a>

            <button class="bimco-header__mobile-back-button" 
              disabled
              x-on:click="showTopMenu()" 
              x-bind:disabled="!mobileBackButtonEnabled">
              <i class="bimco-header__mobile-back-button-chevron fa-sharp fa-solid fa-chevron-left" aria-hidden="true"></i>
              <span class="bimco-header__mobile-back-button-label" aria-label="Go back" x-text="mobileBackButtonText">Go back</span>
            </button>

            <div class="bimco-header__mobile-buttons">
              <button
                class="bimco-header__header-button bimco-header__header-button--search" 
                aria-label="Toggle Search" 
                x-on:click="toggleSearchMenu()">
                <i class="fa-regular fa-sharp fa-magnifying-glass" aria-hidden="true"></i>
              </button>

              <button 
                class="bimco-header__header-button bimco-header__header-button--menu" 
                aria-label="Open Menu"
                x-on:click="openMobileMenu()"
                x-bind:class="{'bimco-header__header-button--hidden': headerExpanded}">
                <i class="fa-regular fa-sharp fa-bars" aria-hidden="true"></i>
              </button>

              <button 
                class="bimco-header__header-button bimco-header__header-button--close bimco-header__header-button--hidden" 
                aria-label="Close Menu" 
                x-on:click="closeAllMenus()"
                x-bind:class="{'bimco-header__header-button--hidden': !headerExpanded}">
                <i class="fa-regular fa-sharp fa-xmark" aria-hidden="true"></i>
              </button>
            </div>

            <nav class="bimco-header__top-menu"
              x-ref="topMenu"
              x-bind:class="{ 'bimco-header__top-menu--one-link-active': isOneLinkActive, 'bimco-header__top-menu--any-menu-open': isAnyMenuOpen }">
              { topLinks && topLinks.map((topLink, index) => (
                <BimcoHeaderTopLink link={topLink} index={index.toString()}/>
              ))}

              <div class="bimco-header__mobile-menu-buttons">
                <Button type="secondary" {...secondaryBtnProps} />
                <Button type="primary" {...primaryBtnProps} />
              </div>
            </nav>

            <div
              class="bimco-header__search-menu" 
              x-ref="searchMenu"
              x-bind:class="{ 'bimco-header__search-menu--active': searchMenuOpen }">

              <SearchMenu />
            </div>

            <div class="bimco-header__desktop-buttons">
              <ButtonGroup>
                <Button type="icon-subtle" size="small" iconBefore="search" ariaLabel="search" contextClass="bimco-header__search-button" xOnClick="toggleSearchMenu()" />
                <Button type="secondary" size="small" {...secondaryBtnProps} />
                <Button type="primary" size="small" {...primaryBtnProps} />
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}