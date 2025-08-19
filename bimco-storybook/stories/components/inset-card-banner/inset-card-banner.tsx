import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";
import "./inset-card-banner.scss";

export const InsetCardBanner = ({
  children
}: PropsWithChildren<object>) => {
  return (
    <div className="inset-card-banner">
      <div className="bimco-container inset-card-banner__container">
        {children}
      </div>
    </div>
  );
};
