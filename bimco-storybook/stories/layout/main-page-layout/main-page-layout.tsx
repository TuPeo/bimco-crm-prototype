import * as React from 'jsx-dom';
import { ReactNode } from 'jsx-dom';
import { BimcoHeader, BimcoHeaderProps } from '../../components/bimco-header/bimco-header';
import { BimcoFooter, BimcoFooterProps } from '../../components/bimco-footer/bimco-footer';

export interface MainPageLayoutProps {
  bimcoHeader: BimcoHeaderProps;
  bimcoFooter: BimcoFooterProps;
  pageTypeClass: string;
  children: ReactNode;
}

export const MainPageLayout = ({ bimcoHeader, bimcoFooter, pageTypeClass, children }: MainPageLayoutProps) => {
  return (
    <div class="main-page-layout">
      <div class="main-page-layout__header">
        <BimcoHeader {...bimcoHeader} />
      </div>
      <div class={`main-page-layout__body ${pageTypeClass}`}>
          { children }
      </div>
      <div class="main-page-layout__footer">
        <BimcoFooter {...bimcoFooter} />
      </div>
    </div>
  )
}
