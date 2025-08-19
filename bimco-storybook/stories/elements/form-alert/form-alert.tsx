import * as React from "jsx-dom";
import "./form-alert.scss";

export interface FormAlertProps {
  message: string;
  type: "information" | "alert" | "error";
}

export const FormAlert = ({ message, type }: FormAlertProps) => {
  return (
    <div class={`form-alert form-alert--${type}`} role="alert">
      <div class="form-alert__box">
        <div class="row align-items-center form-alert__row">
          <div class="col-auto form-alert__icon-column">
            <i
              class={`form-alert__icon fa-sharp fa-solid fa-${getIconType(
                type
              )}`}
              aria-hidden="true"
            />
          </div>
          <div class="col form-alert__message-column">
            <p class="form-alert__message">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to get the appropriate icon based on the alert type
const getIconType = (type: string) => {
  switch (type) {
    case "information":
      return "circle-question";
    case "alert":
      return "exclamation-circle";
    case "error":
      return "exclamation-circle";
    default:
      return "circle-info";
  }
};
