import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";

import { NavigationSwiper } from "../navigation-swiper/navigation-swiper"

import "./navigation-card-list.scss";

export interface NavigationCardListProps {
  slideCssClass: string;
}

export const NavigationCardList = ({
  slideCssClass,
  children
}: PropsWithChildren<NavigationCardListProps>) => {
  return (
    <NavigationSwiper contextClass="navigation-card-list" slideCssClass={slideCssClass}>
      {children}
    </NavigationSwiper>
  )
}
