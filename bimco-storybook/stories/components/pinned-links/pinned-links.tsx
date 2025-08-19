import * as React from "jsx-dom";
import "./pinned-links.scss";
import LinkArgs from "../../types/link-args";
import { Button } from "../../elements/button/button";

export interface PinnedLinksArgs {
  links: LinkArgs[];
}

export const PinnedLinks = ({
  links
}: PinnedLinksArgs) => {
  return <div class="pinned-links"
    x-load
    x-data="pinnedLinks">
    <div class="pinned-links__header">
      <span class="pinned-links__heading">Your saved links</span>
      <Button type="link" contextClass="pinned-links__editlink" href="/" label="Edit" iconBefore="pencil" iconStyle="regular" />
    </div>
    <div class="pinned-links__links" x-ref="links">
      {links.map(link =>
        <Button type="link" contextClass="pinned-links__link" href={link.url} label={link.label} iconBefore="bookmark" iconStyle="solid" />
      )}
    </div>
  </div>
}
