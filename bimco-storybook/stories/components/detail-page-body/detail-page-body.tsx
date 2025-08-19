import * as React from "jsx-dom";
import { ReactNode } from "jsx-dom";

import "./detail-page-body.scss";

export interface DetailPageBodyProps {
  children?: ReactNode | undefined
}

export const DetailPageBody = ({
  children
}: DetailPageBodyProps) => {
  return (
    <div className='detail-page-body'>
      <div class='bimco-container'>
        <div class='detail-page-body__inner theme-zone theme--white'>
          { children }
        </div>
      </div>
    </div>
  )
};