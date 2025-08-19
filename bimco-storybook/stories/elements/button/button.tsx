import * as React from "jsx-dom";

import "./button.scss";

export interface ButtonProps {
  label?: string;
  ariaLabel?: string;
  title?: string;
  type: "primary" | "secondary" | "icon-full" | "icon-subtle" | "icon-empty" | "icon-tag" | "success" | "danger" | "link" | "toggle" | "card";
  size?: "default" | "small" | "large" | "fill";
  iconStyle?: "regular" | "solid";
  iconBeforeStyle?: string;
  iconAfterStyle?: string;
  iconBefore?: string;
  iconAfter?: string;
  isDisabled?: boolean;
  isHighlighted?: boolean;
  href?: string;
  contextClass?: string;
  xOnClick?: string;
  xRef?: string;
  data?: Record<string, string>;
}

export const Button = ({
  label = "Button Text",
  ariaLabel,
  title,
  type = "primary",
  size = "default",
  isDisabled = false,
  isHighlighted = false,
  iconStyle = "regular",
  iconBeforeStyle,
  iconAfterStyle,
  iconBefore,
  iconAfter,
  href,
  contextClass,
  xOnClick,
  xRef,
  data
}: ButtonProps) => {
  let classes = [`btn`, `btn-${type}`]

  if (size && size !== "default") {
    classes = [...classes, `btn--${size}`]
  }
  
  if (isHighlighted) {
    classes = [...classes, 'btn--highlighted']
  }

  if (contextClass) {
    classes = [...classes, contextClass]
  }

  const ButtonTag = href ? "a" : "button";
  const iconBeforeClasses = ["btn__icon", "btn__icon--before", "fa-sharp", `fa-${iconBeforeStyle ?? iconStyle}`, `fa-${iconBefore}`];
  const iconAfterClasses = ["btn__icon", "btn__icon--after", "fa-sharp", `fa-${iconAfterStyle ?? iconStyle}`, `fa-${iconAfter}`];

  const hasPrimaryAnimation = ["primary", "success", "danger"].includes(type);
  const hasIconOnly = ["icon-full", "icon-subtle", "toggle"].includes(type);

  return (
    <ButtonTag 
      class={ classes } 
      href={ href } 
      title={ title || (hasIconOnly && label) }
      aria-label={ ariaLabel || (hasIconOnly && label) }
      { ...(isDisabled && {disabled:true}) } 
      x-on:click={ xOnClick } 
      x-ref={ xRef } 
      { ...data }>
        
      <span class="btn__content btn__content--initial">
        { iconBefore && <i class={ iconBeforeClasses } aria-hidden="true"></i> }
        { !hasIconOnly && label }
        { iconAfter && <i class={ iconAfterClasses } aria-hidden="true"></i> }
      </span>

      { hasPrimaryAnimation && 
        <span class="btn__content btn__content--hover" aria-hidden="true">
          { iconBefore && <i class={ iconBeforeClasses } aria-hidden="true"></i> }
          { !hasIconOnly && label }
          { iconAfter && <i class={ iconAfterClasses } aria-hidden="true"></i> }
        </span>
      }
    </ButtonTag>
  )
}