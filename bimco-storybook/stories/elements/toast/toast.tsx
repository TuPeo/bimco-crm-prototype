import * as React from "jsx-dom";
import "./toast.scss";

export interface ToastProps {
  header: string;
  message: string;
  type: "information" | "alert" | "error" | "success";
  washedBackground?: boolean;
}

export const Toast = ({
  header,
  message,
  type,
  washedBackground = false,
}: ToastProps) => {
  return (
    <div
      x-load="visible"
      x-data="toastComponent"
      x-bind:class="{ 'toast--show': visible }"
      class={`toast toast--${type} ${washedBackground ? "toast--washed" : ""}`}
    >
      <div class="toast__box">
        <div class="row align-items-center toast__row">
          <div class="col-auto toast__icon-column">
            <i
              class={`toast__icon fa-sharp fa-solid fa-${getIconType(type)}`}
              aria-hidden="true"
            />
          </div>
          <div class="col toast__message-column">
            <h4 class="toast__header">{header}</h4>
            <p class="toast__message">{message}</p>
          </div>
          <div class="col-auto toast__close-column">
            <button
              class="toast__close-button"
              x-on:click="hideToast()"
              title="close"
            >
              <i
                class="toast__xmark fa-sharp fa-solid fa-xmark"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to get the appropriate icon based on the toast type
const getIconType = (type: string) => {
  switch (type) {
    case "information":
      return "circle-info";
    case "alert":
      return "triangle-exclamation";
    case "error":
      return "circle-exclamation";
    case "success":
      return "circle-check";
    default:
      return "circle-info";
  }
};
