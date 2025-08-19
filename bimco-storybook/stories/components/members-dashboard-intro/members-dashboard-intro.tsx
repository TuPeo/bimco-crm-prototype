import * as React from "jsx-dom";
import "./members-dashboard-intro.scss";

import { Button } from "../../elements/button/button";

interface ImageArgs {
  alt: string;
  url: string;
}

export interface MembersDashboardIntroArgs {
  greeting: string;
  username: string;
  highlightColour: string;
  company?: string;
  icon: ImageArgs;
  banner: ImageArgs;
}

export const MembersDashboardIntro = ({
  greeting,
  username,
  highlightColour,
  company,
  icon,
  banner
}: MembersDashboardIntroArgs) => {
  return <div class="members-dashboard-intro">
    <div class="members-dashboard-intro__image">
      <img class="members-dashboard-intro__banner-image" src={banner.url} alt={banner.alt} />
      <div class="members-dashboard-intro__edit-button">
        <Button type="icon-subtle" iconBefore="pencil" iconStyle="regular" />
      </div>
    </div>
    <div class="members-dashboard-intro__content">
      <div class="bimco-container">
        <div class="row">
          <div class="members-dashboard-intro__icon">
            <img src={icon.url} alt={icon.alt} />
          </div>
        </div>
        <div class="row members-dashboard-intro__welcome-row">
          <div class="members-dashboard-intro__greeting-wrapper">
            <h3 class="members-dashboard-intro__greeting">{greeting} <span class="members-dashboard-intro__username" style={`color: ${highlightColour}`}>{username}</span></h3>
            {company &&
              <h5 class="members-dashboard-intro__company">{company}</h5>
            }
          </div>
          <div class="members-dashboard-intro__account-button-wrapper">
            <Button type="secondary" iconBefore="user" iconStyle="solid" label="My account" iconAfter="chevron-down" />
          </div>
        </div>
      </div>
    </div>
  </div>
}
