import type { StoryObj, Meta } from '@storybook/html';
import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";

import { ArticlePage, ArticlePageProps } from "./article-page";
import { SiteHeader } from '../../components/bimco-header/bimco-header.stories';
import { BimcoSiteFooter } from '../../components/bimco-footer/bimco-footer.stories';
import * as ArticleHeroBanner from "../../components/article-hero-banner/article-hero-banner.stories";
import * as RelatedTags from "../../components/related-tags/related-tags.stories";
import * as SocialShare from "../../components/news-social-share/news-social-share.stories";
import { ArticleContentGridBlock } from '../../components/article-content-grid/article-content-grid-block';
import { InsetCtaGridItem } from '../../components/inset-cta/inset-cta-grid-item';
import { InsetCtaProps } from '../../components/inset-cta/inset-cta';
import { ArticleAbstractGridItem } from '../../components/article-content-grid/article-abstract-grid-item';
import { ArticleBodyTextGridItem } from '../../components/article-content-grid/article-body-text-grid-item';
import { TextContentGridBlock } from '../../components/text-content-grid/text-content-grid-block';
import { TextContentGridLayoutMax2Cols } from '../../components/text-content-grid/text-content-grid-layout-max-2-cols';
import { TextContentProps } from '../../components/text-content-grid/text-content';
import { TextContentGridItem } from '../../components/text-content-grid/text-content-grid-item';

const meta: Meta<typeof ArticlePage> = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Pages/Article Page',
  tags: ['autodocs'],
  component: ArticlePage,
};

export default meta;
type Story = StoryObj<PropsWithChildren<ArticlePageProps>>;

const insetCta: InsetCtaProps = {
  wash: true,
  theme: 'light',
  ctas: [
    { type: 'primary', label: 'Discover' },
    { type: 'secondary', label: 'Join us' }
  ],
  background: {
    url: "media/inset-cta.png",
    alt: "Example background",
  },
};

const insetCtaContent = [
  <h3 class="headline-5">
    <span class="eyebrow">Member exclusive story</span> 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac mattis leo. 
    <em>Ut malesuada felis.</em>
  </h3>,
  <p>Become a BIMCO member today to access exclusive resources and much more...</p>
];

const articleAbstract = [
  <h2 class="headline-4">Article abstract heading</h2>,
  <p class="lead">Lead paragraph lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>,
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>,
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
];

const articleBodyText = [
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>,
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>,
  <p class="pull-out">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>,
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>,
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>,
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
];

const textContentMain: TextContentProps = {
  itemType: 'main',
  eyebrowText: 'Eyebrow',
  headingText: 'Main text heading'
};

const textContentMainContent = [
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
];

const textContentAdditional: TextContentProps = {
  itemType: 'additional',
  ctas: [
    { type: 'primary', label: 'Membership' },
    { type: 'secondary', label: 'Contracts' },
    { type: 'secondary', label: 'Regulation' }
  ]
};

const textContentAdditionalContent = [
  <h3 class="headline-5">Additional text sub-heading</h3>,
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>,
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>,
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
];

export const NewsAndInsightsProtected: Story = {
  render: (args) => ArticlePage({...args,
    children: [
      ArticleContentGridBlock({ 
        topDivider: false,
        children: [
          InsetCtaGridItem({ 
            colSpan: 6, 
            rowSpan: 1, 
            insetCta: insetCta, 
            children: insetCtaContent 
          }),
          ArticleAbstractGridItem({ 
            colSpan: 6, 
            children: articleAbstract 
          })
      ]})
  ]}),
  args: {
    bimcoHeader: SiteHeader.args,
    bimcoFooter: BimcoSiteFooter.args,
    articleHeroBanner: ArticleHeroBanner.NewsAndInsights.args,
    relatedTags: RelatedTags.DefaultTags.args,
    socialShare: SocialShare.DefaultShare.args
  }
}

export const NewsAndInsightsPublic: Story = {
  render: (args) => ArticlePage({...args, children: [
    ArticleContentGridBlock({ 
      topDivider: false,
      children: [
        ArticleAbstractGridItem({ 
          colSpan: 8,
          children: articleAbstract 
        }),
        ArticleBodyTextGridItem({ 
          colSpan: 8, 
          children: articleBodyText 
        })
    ]}),
    TextContentGridBlock({ 
      theme: "white",
      topDivider: true,
      children: [
        TextContentGridLayoutMax2Cols({
          mainAreaItem: TextContentGridItem({ 
            colSpan: 6, 
            typeAlias: "textContentGridItemMain", 
            textContent: textContentMain, 
            children: textContentMainContent
          }),
          children: [
            TextContentGridItem({ 
              colSpan: 6, 
              typeAlias: "textContentGridItemAdditional", 
              textContent: textContentAdditional, 
              children: textContentAdditionalContent
            })
          ]
        })
    ]})
  ]}),
  args: {
    bimcoHeader: SiteHeader.args,
    bimcoFooter: BimcoSiteFooter.args,
    articleHeroBanner: ArticleHeroBanner.NewsAndInsights.args,
    relatedTags: RelatedTags.DefaultTags.args,
    socialShare: SocialShare.DefaultShare.args
  }
}
