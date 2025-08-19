import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";
import { MainPageLayout } from '../../layout/main-page-layout/main-page-layout';
import { BimcoHeaderProps } from '../../components/bimco-header/bimco-header';
import { BimcoFooterProps } from '../../components/bimco-footer/bimco-footer';
import { UmbBlockList } from '../../layout/umb-block/umb-block-list';
import { HomePageHero, HomePageHeroArgs } from '../../components/home-page-hero/home-page-hero';

export interface HomePageProps {
  bimcoHeader?: BimcoHeaderProps;
  bimcoFooter?: BimcoFooterProps;
  homePageHeroBanner?: HomePageHeroArgs;
}

export const HomePageComponent = ({
  bimcoHeader,
  bimcoFooter,
  homePageHeroBanner: homePageHeroBanner,
  children
}: PropsWithChildren<HomePageProps>) => {
  return (
    <MainPageLayout bimcoHeader={bimcoHeader} bimcoFooter={bimcoFooter} pageTypeClass="home-page">
    <HomePageHero {...homePageHeroBanner} />
    <UmbBlockList>
      {children}
    </UmbBlockList>
    </MainPageLayout>
  )
}
