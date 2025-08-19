import * as React from 'jsx-dom';
import { Button } from '../../elements/button/button';
import ImageArgs from '../../types/image-args';
import { PreviewCardProps } from '../preview-card/preview-card';
import { CardMetaData } from '../card-metadata/card-metadata';
import { KeyDetails } from '../key-details/key-details';
import { EventDetails } from '../key-details/key-details.stories';

import './content-card.scss'
import LinkArgs from '../../types/link-args';

export interface ContentCardProps extends PreviewCardProps {
  displayImage: boolean;
  image?: ImageArgs;
  imageOverlay?: string;
  desc?: string;
  hasOverlay?: boolean;
  linkStyle?: 'link' | 'button';
}

const CardLink = (linkStyle: 'link' | 'button', link: LinkArgs) => {
  const buttonType = linkStyle == 'link' ? 'link' : 'card';
  return <Button
    type={buttonType} 
    contextClass={`stretched-link content-card__cta content-card__cta--${buttonType}`} 
    label={link.label} 
    href={link.url} />
}

export const ContentCard = ({
  displayImage,
  image,
  imageOverlay,
  title,
  metadata,
  desc,
  hasOverlay = false,
  link = { url: '#', label: 'Read more' },
  linkStyle = 'link'
}: ContentCardProps) => {
  return <div class="content-card">
    <div class="content-card__row">
      {displayImage &&
        <div class="content-card__image-col">
          {image &&
            <img class="content-card__image" src={image.url} alt={image.alt} />
          }
          {imageOverlay && <div class="content-card__image-overlay">
            {imageOverlay}
          </div>}
        </div>
      }
      <div class="content-card__content-col">
        <div class="content-card__content">
          {metadata &&
            <CardMetaData {...metadata} />
          }
          <h3 class="content-card__title">{title}</h3>
          {desc && !hasOverlay &&
            <p class="content-card__description">
              {desc}
            </p>
          }
        </div>

        {hasOverlay &&
          <div class="content-card__overlay">
            <p class="content-card__description">
              {desc}
            </p>

            <div class="content-card__key-details">
              <KeyDetails details={EventDetails.args.details} />
            </div>

            <div class="content-card__overlay-link">
              {CardLink(linkStyle, link)}
            </div>
          </div>
        }

        <div class="content-card__links">
          {CardLink(linkStyle, link)}
        </div>
      </div>
    </div>
  </div>
}
