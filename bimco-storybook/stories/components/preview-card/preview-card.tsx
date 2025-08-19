import * as React from "jsx-dom";
import LinkArgs from "../../types/link-args";
import { CardMetaData, CardMetaDataProps } from "../card-metadata/card-metadata";

import "./preview-card.scss";

export interface PreviewCardProps {
  title: string;
  link: LinkArgs;
  metadata?: CardMetaDataProps;
}

export const PreviewCard = ({
  title,
  link,
  metadata
}: PreviewCardProps) => {
  return <a class="preview-card" href={link.url}>
    { metadata && <CardMetaData {...metadata} /> }
    <h3 class="preview-card__title">{title}</h3>
  </a>
}
