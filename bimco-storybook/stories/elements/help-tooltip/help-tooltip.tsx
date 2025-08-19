import * as React from "jsx-dom";
import "./help-tooltip.scss";

export interface HelpTooltipProps {
  message: string;
  position?: "top" | "bottom" | "left" | "right";
  backgroundColor: string;
  color: string;
}

const sanitise = (input: string) => input.replace("#", "");
const getTooltipColourClass = (backgroundColor: string, color: string) =>
  `${sanitise(backgroundColor)}-${sanitise(color)}`;

export const HelpTooltip = ({
  message,
  position = "bottom",
  backgroundColor = "#004460",
  color = "#ffffff"
}: HelpTooltipProps) => {
  const tooltipColourClass = getTooltipColourClass(backgroundColor, color);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          .help-tooltip--${tooltipColourClass} {
            .tooltip-inner {
              background-color: ${backgroundColor};
              color: ${color};
            }
            &[data-popper-placement^="left"] .tooltip-arrow::before {
              border-left-color: ${backgroundColor};
            }
            &[data-popper-placement^="right"] .tooltip-arrow::before {
              border-right-color: ${backgroundColor};
            }
            &[data-popper-placement^="top"] .tooltip-arrow::before {
              border-top-color: ${backgroundColor};
            }
            &[data-popper-placement^="bottom"] .tooltip-arrow::before {
              border-bottom-color: ${backgroundColor};
            }
          }
        }`}}>
      </style>
      <div
        x-load
        x-data="helpTooltip"
        data-bs-custom-class={`help-tooltip help-tooltip--${position} help-tooltip--${tooltipColourClass}`}
        data-bs-toggle="tooltip"
        data-bs-placement={position}
        data-bs-animation="true"
        title={message}
        role="tooltip">
        <i
          class="help-tooltip__icon fa-sharp fa-solid fa-circle-question"
          aria-hidden="true"
        ></i>
      </div>
    </>
  );
};
