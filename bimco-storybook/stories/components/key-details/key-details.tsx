import * as React from "jsx-dom";

import "./key-details.scss";

interface KeyDetail {
  title: string;
  iconStyle?: string;
  content?: React.ReactNode;
  icon?: string;
  link?: string;
}

export interface KeyDetailsProps {
  details: KeyDetail[];
}

export const KeyDetails = ({ details }: KeyDetailsProps) => {
  return (
    <div class="key-details">
      {details && details.map(detail => {
        const keyDetailHoverClass = detail.link ? "key-details__detail--hoverable" : "";

        return (
          <div class={`key-details__detail ${keyDetailHoverClass}`}>
            <div class="key-details__detail-icon">
              {detail.icon &&
                <i class={`fa-sharp fa-${detail.iconStyle} fa-${detail.icon}`} aria-hidden="true"></i>
              }
            </div>
            <div class="key-details__detail-desc">
              <span class="key-details__detail-title">{detail.title}</span>
              {detail.content &&
                <span class="key-details__detail-content">{detail.content}</span>
              }
            </div>

            {detail.link &&
              <a class="stretched-link" title="@keyDetail.Link.Name" target="@keyDetail.Link.Target" href="@keyDetail.Link.Url"></a>
            }
          </div>
        )
      }
      )}
    </div>
  )
}