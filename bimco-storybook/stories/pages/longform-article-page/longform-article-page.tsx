import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";
import { MainPageLayout } from '../../layout/main-page-layout/main-page-layout';
import { BimcoHeaderProps } from '../../components/bimco-header/bimco-header';
import { BimcoFooterProps } from '../../components/bimco-footer/bimco-footer';
import { UmbBlockList } from '../../layout/umb-block/umb-block-list';
import { LongformArticleHero, LongformArticleHeroProps } from '../../components/longform-article-hero/longform-article-hero';
import { ChapterLinks, ChapterLinksProps } from '../../components/chapter-links/chapter-links';

export interface LongformArticlePageProps {
  bimcoHeader?: BimcoHeaderProps;
  bimcoFooter?: BimcoFooterProps;
  longformArticleHero?: LongformArticleHeroProps;
  chapterLinks: ChapterLinksProps;
}

export const LongformArticlePage = ({
  bimcoHeader,
  bimcoFooter,
  longformArticleHero,
  chapterLinks,
  children
}: PropsWithChildren<LongformArticlePageProps>) => {
  return (
    <MainPageLayout bimcoHeader={bimcoHeader} bimcoFooter={bimcoFooter} pageTypeClass="longform-content-page">
      <div class="scroll-triggers-blocklist"
        x-load
        x-data="scrollTriggersBlocklist">

        <LongformArticleHero {...longformArticleHero} />
        <ChapterLinks {...chapterLinks} />
        <UmbBlockList>
          {children}
        </UmbBlockList>
      </div>
    </MainPageLayout>
  )
}
