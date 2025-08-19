import * as React from "jsx-dom";
import "./office-card.scss";
import { Button } from "../button/button";
import ImageArgs from "../../types/image-args";

export interface OfficeCardProps {
  name: string;
  image: ImageArgs;
  address: string;
  email: string;
  phone: string;
  theme: string;
}

export const CopenhagenArgs: OfficeCardProps = {
  name: 'Copenhagen',
  address: 'Bagsværdvej 161<br />2880 Bagsværd<br />Denmark',
  image: {
    url: 'media/city.jpg',
    alt: 'office'
  },
  email: "mailbox@bimco.org",
  phone: "000000000000",
  theme: "orange"
}

export const BrusselsArgs: OfficeCardProps = {
  name: 'Brussels',
  address: 'De Meeûssquare /<br />Square de Meeûs 35<br />1000 Brussels<br />Belgium',
  image: {
    url: 'media/city.jpg',
    alt: 'office'
  },
  email: "mailbox@bimco.org",
  phone: "000000000000",
  theme: "pink"
}

export const HoustonArgs: OfficeCardProps = {
  name: 'Houston',
  address: '12848 Queensbury Lane<br />Suite 208 <br />Houston 77024,<br />United States',
  image: {
    url: 'media/city.jpg',
    alt: 'office'
  },
  email: "mailbox@bimco.org",
  phone: "000000000000",
  theme: "green"
}

export const AthensArgs: OfficeCardProps = {
  name: 'Athens',
  address: '16, Gr. Lampraki & Metaxa St., 2nd floor<br />166 74 Glyfada<br />Athens<br />Greece',
  image: {
    url: 'media/city.jpg',
    alt: 'office'
  },
  email: "mailbox@bimco.org",
  phone: "000000000000",
  theme: "blue"
}

export const OfficeCard = ({
  name,
  image,
  address,
  email,
  phone,
  theme,
}: OfficeCardProps) => {
  const themeClasses = `theme-zone theme--${theme == "pink" ? "dark" : "light"}`;

  return (
    <div class={`office-card office-card--${theme} ${themeClasses}`}>
      <div class="office-card__content">
        <div class="office-card__content-top">
          <picture class="office-card__image-wrapper">
            <img
              src={image.url}
              alt={image.alt}
              class="office-card__image"
            />
          </picture>
          <div class="office-card__name-backdrop">
          </div>
          <h2 class="office-card__name">{name}</h2>
        </div>
        <div class="office-card__content-bottom">
          <div class="office-card__address">
            <div class="office-card__address-label">
              Address:
            </div>
            <div class="office-card__address-text" dangerouslySetInnerHTML={{ __html: address }}>
            </div>
          </div>
          <ul class="office-card__tags">
            <li class="office-card__tag"><span class="office-card__tag-label">Email:</span> {email}</li>
            <li class="office-card__tag"><span class="office-card__tag-label">Phone:</span> {phone}</li>
          </ul>
          <div class="office-card__buttons">
            <Button type="secondary" label="Email" href={`mailto:${email}`} iconBefore="envelope" iconStyle="solid" />
            <Button type="secondary" label="Phone" href={`tel:${phone}`} iconBefore="phone" iconStyle="solid" />
          </div>
        </div>
      </div>
    </div>
  );
};
