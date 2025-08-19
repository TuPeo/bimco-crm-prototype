import * as React from "jsx-dom";
import "./contract-navigation-pane.scss";
import { Button } from "../../elements/button/button";
import LinkArgs from "../../types/link-args";

export interface ContractNavigationPaneProps {
  centerLink: LinkArgs;
  previousLink: LinkArgs;
  nextLink: LinkArgs;
}

export const ContractNavigationPane = ({
  centerLink,
  previousLink,
  nextLink,
}: ContractNavigationPaneProps) => {
  return (
    <div className="contract-navigation-pane theme-zone theme--white">
      <div className="contract-navigation-pane__row  row col-12">
        {/* Center Section */}
        <a
          className="contract-navigation-pane__section contract-navigation-pane__section--center col-12 col-md-4 order-1 order-md-2"
          href={centerLink.url}
        >
          <span className="contract-navigation-pane__title">
            <Button
              size="large"
              type="link"
              label={centerLink.label}
              title={centerLink.label}
              contextClass="contract-navigation-pane__link--center"
              href={centerLink.url}
            />
          </span>
          <span className="contract-navigation-pane__icon--center">
            <i className="fa fa-sharp fa-solid fa-eye" aria-hidden="true"></i>
          </span>
        </a>

        {/* Previous Section */}
        <a
          className="contract-navigation-pane__section contract-navigation-pane__section--previous col-6 col-md-4 order-2 order-md-1"
          href={previousLink.url}
        >
          <div className="contract-navigation-pane__section--row">
            <Button
              size="large"
              type="link"
              label="PREVIOUS"
              title={previousLink.label}
              iconBefore="arrow-left"
              contextClass="contract-navigation-pane__link d-none d-md-block"
              href={previousLink.url}
            />
            <span className="contract-navigation-pane__icon d-md-none">
              <i
                className="fa fa-sharp fa-regular fa-arrow-left"
                aria-hidden="true"
              ></i>
            </span>
          </div>
          <span className="contract-navigation-pane__contract-title">
            {previousLink.label}
          </span>
        </a>

        {/* Next Section */}
        <a
          className="contract-navigation-pane__section contract-navigation-pane__section--next col-6 col-md-4 order-3"
          href={nextLink.url}
        >
          <div className="contract-navigation-pane__section--row">
            <Button
              size="large"
              type="link"
              label="NEXT"
              title={nextLink.label}
              iconAfter="arrow-right"
              contextClass="contract-navigation-pane__link d-none d-md-block"
              href={nextLink.url}
            />
            <span className="contract-navigation-pane__icon d-md-none">
              <i
                className="fa fa-sharp fa-regular fa-arrow-right"
                aria-hidden="true"
              ></i>
            </span>
          </div>
          <span className="contract-navigation-pane__contract-title">
            {nextLink.label}
          </span>
        </a>
      </div>
    </div>
  );
};
