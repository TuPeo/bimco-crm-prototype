import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";

import "./button-group.scss";

export interface ButtonGroupProps {
  contextClass?: string;
  autoWidthBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

export const ButtonGroup = ({
  contextClass = "", 
  autoWidthBreakpoint = "md",
  children
}: PropsWithChildren<ButtonGroupProps>) => {
  return (
    <div class={`${contextClass} btn-group btn-group--auto-width-${autoWidthBreakpoint}`}>
      {children}
    </div>
  )
}