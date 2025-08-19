import * as React from 'jsx-dom';
import './reusable-card.scss'
import { ButtonGroup } from '../button-group/button-group';
import { Button, ButtonProps } from '../button/button';
import ImageArgs from "../../types/image-args";

interface ReusableCardTagArgs {
  title: string;
  subtitle?: string;
  iconStyle?: "regular" | "solid";
  iconBefore?: string;
}

export interface ReusableCardArgs {
  image?: ImageArgs;
  imagePopout?: string;
  title: string;
  cardTags?: ReusableCardTagArgs[];
  subtitle?: string;
  desc?: string;
  hoverDesc?: string;
  hoverTags?: ReusableCardTagArgs[];
  links?: ButtonProps[];
  variant: string;
  orientation?: string;
  theme?: "white" | "light" | "dark" | "brand";
}

export const PersonArgs: ReusableCardArgs = {
  image: {
    url: "/media/person-portrait.png",
    alt: "John Loosley"
  },
  title: "John Loosley",
  subtitle: "Chief executive officer",
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at sapien libero. Pellentesque cursus imperdiet nibh, nec facilisis tellus tempus at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at sapien libero. Pellentesque cursus imperdiet nibh, nec facilisis tellus tempus at.",
  links: [
    {
      type: "icon-subtle",
      size: "large",
      title: "email",
      href: "mailto:john@example.com",
      iconStyle: "solid",
      iconBefore: "envelope"
    },
    {
      type: "icon-subtle",
      size: "large",
      title: "email",
      href: "tel:123456890",
      iconStyle: "solid",
      iconBefore: "phone"
    }
  ],
  variant: "person",
  orientation: "none"
};

export const PersonLandscapeArgs: ReusableCardArgs = {
  image: {
    url: "/media/person-portrait.png",
    alt: "Christian Hoppe"
  },
  title: "Christian Hoppe",
  subtitle: "General Counsel",
  links: [
    {
      type: "icon-subtle",
      size: "large",
      title: "email",
      href: "mailto:john@example.com",
      iconStyle: "solid",
      iconBefore: "envelope"
    },
    {
      type: "icon-subtle",
      size: "large",
      title: "email",
      href: "tel:123456890",
      iconStyle: "solid",
      iconBefore: "phone"
    }
  ],
  variant: "person",
  orientation: "landscape"
};

export const NewsArgs: ReusableCardArgs = {
  image: {
    url: "media/news-detail-hero-banner.jpg",
    alt: "Insights"
  },
  cardTags: [{
    title: "Insights"
  },
  {
    title: "21 August 2024"
  },
  {
    title: "Greenwich",
    iconStyle: "solid",
    iconBefore: "location-dot"
  }],
  title: "Liquid cargo of the month September 2024 - Resin oil, distilled lorem",
  desc: "The BIMCO Liquid Cargo database is intended for use by for shore-side staff and to some extent for newcomers to the tanker trade and should only be used as a reference tool providing brief information regarding the more than 330 of the commonly transported liquid cargoes including Resin oil, distilled.",
  links: [
    {
      type: "link",
      href: "/",
      label: "Read more"
    }
  ],
  variant: "news"
};

export const NewsNoImageArgs: ReusableCardArgs = { 
  ...NewsArgs,
  image: null 
};

export const ReusableCard = ({
  image,
  imagePopout,
  title,
  cardTags,
  subtitle,
  desc,
  links,
  hoverDesc,
  hoverTags,
  theme,
  variant = "news",
  orientation = "portrait"
}: ReusableCardArgs) => {

  const cardClasses = ["reusable-card"]
  cardClasses.push(`reusable-card--${variant}`);

  if (orientation == "landscape") {
    cardClasses.push("reusable-card--landscape");
  }
  if (orientation == "none") {
    cardClasses.push("reusable-card--resizeable");
  }

  let themeClasses = "";
  if (theme) {
    themeClasses = `theme-zone theme--${theme}`;
  }

  return <div class={`reusable-card__wrapper ${themeClasses}`}>
    <div class={cardClasses}>
      {image &&
        <div class="reusable-card__image">
          <img src={image.url} alt={image.alt} />
          
          {imagePopout &&
            <span class="reusable-card__image-popout"><h3>{imagePopout}</h3></span>
          }
        </div>
      }
      <div class="reusable-card__description-wrapper">
        <div class="reusable-card__description">
          {cardTags &&
            <div class="reusable-card__tags">
              {cardTags.map((tag, index) => {
                const iconBeforeClasses = ["reusable-card__tag-icon", "fa-sharp", `fa-${tag.iconStyle}`, `fa-${tag.iconBefore}`];
                return <>
                  {index > 0 &&
                    <span class="reusable-card__tags-divider"></span>
                  }
                  <span class="reusable-card__tag">
                    {tag.iconBefore &&
                      <i class={iconBeforeClasses} aria-hidden="true"></i>
                    }
                    {tag.title}
                  </span>
                </>
              })}
            </div>}
          <div class="reusable-card__titles">
            <h4 class="reusable-card__title">{title}</h4>
            {subtitle &&
              <span class="reusable-card__subtitle">{subtitle}</span>
            }
          </div>
          {desc &&
            <p class="reusable-card__desc">{desc}</p>
          }
        </div>
        {links &&
          <div class="reusable-card__contact">
            <ButtonGroup>
              {links.map((link) => (
                <Button {...link} />
              ))}
            </ButtonGroup>
          </div>
        }
      </div>
    </div>
    <div class={`reusable-card reusable-card--${variant} reusable-card__hover-backdrop`}>
      <div class="reusable-card__hover-gradient"></div>
      <div class="reusable-card__image">
        <div class="reusable-card__hover-top">{hoverDesc}</div>
      </div>
      <div class="reusable-card__description-wrapper">
        {hoverTags &&
          <div class="reusable-card__description">
            {hoverTags.map(tag => {
              const iconBeforeClasses = ["fa-sharp", `fa-${tag.iconStyle}`, `fa-${tag.iconBefore}`];
              return <div class="reusable-card__hover-tag">
                <div class="reusable-card__hover-tag-icon">
                  {tag.iconBefore &&
                    <i class={iconBeforeClasses} aria-hidden="true"></i>
                  }
                </div>
                <div class="reusable-card__hover-tag-desc">
                  <span class="reusable-card__hover-tag-title">{tag.title}</span>
                  {tag.subtitle &&
                    <span class="reusable-card__hover-tag-subtitle">{tag.subtitle}</span>
                  }
                </div>
              </div>
            })}
          </div>
        }
        {links &&
          <div class="reusable-card__contact">
            <ButtonGroup>
              {links.map((link) => (
                <Button {...link} />
              ))}
            </ButtonGroup>
          </div>
        }
      </div>
    </div>
  </div>
};