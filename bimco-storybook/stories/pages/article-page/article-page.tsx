import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";

import { MainPageLayout } from '../../layout/main-page-layout/main-page-layout';
import { BimcoHeaderProps } from '../../components/bimco-header/bimco-header';
import { BimcoFooterProps } from '../../components/bimco-footer/bimco-footer';
import { ArticleHeroBanner, ArticleHeroBannerProps } from '../../components/article-hero-banner/article-hero-banner';
import { RelatedTags, RelatedTagsProps } from '../../components/related-tags/related-tags';
import { NewsSocialShare, NewsSocialShareProps } from '../../components/news-social-share/news-social-share';
import { UmbBlockList } from '../../layout/umb-block/umb-block-list';

export interface ArticlePageProps {
  bimcoHeader?: BimcoHeaderProps;
  bimcoFooter?: BimcoFooterProps;
  articleHeroBanner?: ArticleHeroBannerProps;
  relatedTags?: RelatedTagsProps;
  socialShare?: NewsSocialShareProps;
}

export const ArticlePage = ({
  bimcoHeader,
  bimcoFooter,
  articleHeroBanner,
  relatedTags,
  socialShare,
  children
}: PropsWithChildren<ArticlePageProps>) => {
  return (
    <MainPageLayout bimcoHeader={bimcoHeader} bimcoFooter={bimcoFooter} pageTypeClass="article-page">
      <ArticleHeroBanner {...articleHeroBanner} />

      <div class="bimco-container">
        <UmbBlockList>
          {children}
        </UmbBlockList>

        <div class="row">
          <div class="col-12 col-lg-9">
            <RelatedTags {...relatedTags} />
          </div>
          <div class="col-12 col-lg-3">
            <NewsSocialShare {...socialShare} />
          </div>
        </div>
      </div>
    </MainPageLayout>
  )
}
