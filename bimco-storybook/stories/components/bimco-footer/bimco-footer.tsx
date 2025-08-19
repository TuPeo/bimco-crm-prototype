import * as React from "jsx-dom";

import "./bimco-footer.scss";
import { Button } from "../../elements/button/button";
import { SocialLink } from "../../elements/social-link/social-link";
import LinkArgs from "../../types/link-args";

export interface BimcoFooterProps {
  SectionOneHeading?: string;
  SectionOneContent?: React.ReactElement[];
  SectionOneLink?: LinkArgs;
  SectionTwoHeading?: string;
  SectionTwoContent?: LinkArgs[];
  SectionTwoLink?: LinkArgs;
  SectionThreeHeading?: string;
  FooterLinks?: LinkArgs[];
  SectionFourHeading?: string;
}

const BimcoFooterDefaultProps: BimcoFooterProps = {
  SectionOneHeading: "Section 1 Heading",
  SectionOneContent: [
    <p>Section 1 Content - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum vulputate felis non vehicula. Sed vitae sem dignissim</p>
  ],
  SectionOneLink: {
    label: "Section One Link",
    url: "/"
  },
  SectionTwoHeading: "Section 2 Heading",
  SectionTwoContent: [
    {
      label: "email@domain.com",
      url: "mailto:email@domain.com"
    },
    {
      label: "01234567890",
      url: "tel:01234567890"
    }
  ],
  SectionTwoLink: {
    label: "Section Two Link",
    url: "/"
  },
  SectionThreeHeading: "Section 3 Heading",
  SectionFourHeading: "Section 4 Heading",
  FooterLinks: [
    {
      label: "Link 1",
      url: "/"
    },
    {
      label: "Link 2",
      url: "/"
    },
    {
      label: "Link 3",
      url: "/"
    }
  ]
}

export const BimcoFooter = ({
  SectionOneHeading = BimcoFooterDefaultProps.SectionOneHeading,
  SectionOneContent = BimcoFooterDefaultProps.SectionOneContent,
  SectionOneLink = BimcoFooterDefaultProps.SectionOneLink,
  SectionTwoHeading = BimcoFooterDefaultProps.SectionTwoHeading,
  SectionTwoContent = BimcoFooterDefaultProps.SectionTwoContent,
  SectionTwoLink = BimcoFooterDefaultProps.SectionTwoLink,
  SectionThreeHeading = BimcoFooterDefaultProps.SectionThreeHeading,
  SectionFourHeading = BimcoFooterDefaultProps.SectionFourHeading,
  FooterLinks = BimcoFooterDefaultProps.FooterLinks,
}: BimcoFooterProps) => {
  return (
    <footer class="bimco-footer">
      <div class="bimco-footer__container bimco-container">
        <div class="bimco-footer__sections-wrapper">
          <div class="bimco-footer__section bimco-footer__section--1">
            <span class="bimco-footer__section-heading navigation-eyebrow">{SectionOneHeading}</span>
            <div class="bimco-footer__section-content rich-text">
              {SectionOneContent}
            </div>
            { SectionOneLink && 
              <Button type="link" label={SectionOneLink.label} href={SectionOneLink.url} contextClass="bimco-footer__section-cta"></Button>
            }
          </div>
          <div class="bimco-footer__section bimco-footer__section--2">
            <span class="bimco-footer__section-heading navigation-eyebrow">{SectionTwoHeading}</span>
            <div class="bimco-footer__section-content rich-text">
              { SectionTwoContent &&
                SectionTwoContent.map(link => (
                  <a href={link.url}>
                    { link.label }
                  </a>
              ))}
            </div>
            { SectionTwoLink && 
              <Button type="link" label={SectionTwoLink.label} href={SectionTwoLink.url} contextClass="bimco-footer__section-cta"></Button>
            }
          </div>
          <div class="bimco-footer__section bimco-footer__section--3">
            <span class="bimco-footer__section-heading navigation-eyebrow">{SectionThreeHeading}</span>
            <div class="bimco-footer__links">
              {FooterLinks?.map(footerLink => (
                <a class="bimco-footer__link" href={footerLink.url}>
                  {footerLink.label}
                </a>
              ))}
            </div>
          </div>
          <div class="bimco-footer__section bimco-footer__section--4">
            <span class="bimco-footer__section-heading navigation-eyebrow">{SectionFourHeading}</span>

            <div class="bimco-footer__social-links">
              <SocialLink icon="linkedin-in" platformName="Facebook" />
              <SocialLink icon="youtube" platformName="Facebook" />
              <SocialLink icon="facebook-f" platformName="Facebook" />
              <SocialLink icon="x-twitter" platformName="Facebook" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}