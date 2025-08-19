import * as React from "jsx-dom";

import "./social-link.scss";

export interface SocialLinkProps {
  icon: string;
  platformName: string;
  contextClass?: string;
  iconLibrary?: "regular" | "solid";
  isBrand?: boolean;
}

export const SocialLink = ({
  icon = "facebook-f",
  platformName = "facebook",
  contextClass = "",
  iconLibrary = null,
  isBrand = true,
}: SocialLinkProps) => {
  return (
    <a
      class={`social-link ${contextClass}`}
      title={platformName}
      aria-label={platformName}
      href="/"
    >
      <i
        class={`${isBrand ? "fa-brands" : "fa-sharp"} ${
          iconLibrary !== null && "fa-" + iconLibrary
        } fa-${icon}`}
        aria-hidden="true"
      ></i>
    </a>
  );
};
