import * as React from "jsx-dom";
import "./news-social-share.scss";
import { SocialLink } from "../../elements/social-link/social-link";

export interface NewsSocialShareProps {
  icons?: Array<{
    platform: string;
    shared: boolean;
    icon: string;
    isBrand: boolean;
    iconLibrary?: "regular" | "solid";
  }>;
}

export const NewsSocialShare = ({ icons }: NewsSocialShareProps) => {
  return (
    <div class="news-social-share">
      <div class="news-social-share__title">Share This With Others</div>
      <div class="news-social-share__icons">
        {icons && icons.map((icon, index) => (
          <a
            href="#"
            class="news-social-share__icon"
            key={index}
            onClick={(e) => e.preventDefault()} // Prevent link navigation
          >
            {/* Show Social Media Icon if not shared, otherwise show Check Circle Icon */}
            {!icon.shared ? (
              <SocialLink
                icon={icon.icon}
                platformName={icon.platform}
                contextClass="news-social-share__link-button"
                isBrand={icon.isBrand}
                iconLibrary={icon.iconLibrary}
              />
            ) : (
              <SocialLink
                icon="check-circle"
                platformName={icon.platform}
                contextClass="news-social-share__link-button"
                isBrand={false}
                iconLibrary="solid"
              />
            )}
          </a>
        ))}
      </div>
    </div>
  );
};
