import type { StoryObj, Meta } from '@storybook/html';
import * as React from 'jsx-dom';
import { PropsWithChildren } from "jsx-dom";
import { HomePageComponent, HomePageProps } from "./home-page";
import { SiteHeader } from '../../components/bimco-header/bimco-header.stories';
import { BimcoSiteFooter } from '../../components/bimco-footer/bimco-footer.stories';
import { HomePage } from '../../components/home-page-hero/home-page-hero.stories';
import { HomePageHeroArgs } from '../../components/home-page-hero/home-page-hero';
import { FeatureCtaBanner, FeatureCtaBannerProps } from '../../components/feature-cta-banner/feature-cta-banner';
import { FeatureCta } from '../../components/feature-cta-banner/feature-cta-banner.stories';
import { SmallImageAndText, SmallImageAndTextProps } from '../../components/small-image-and-text/small-image-and-text';
import { SmallImageAndTextExample } from '../../components/small-image-and-text/small-image-and-text.stories';
import { QuickLinks, QuickLinksProps } from '../../components/quick-links/quick-links';
import { QuickLinksDefault } from '../../components/quick-links/quick-links.stories';
import { FullscreenSlides, FullscreenSlideProps } from '../../components/fullscreen-slides/fullscreen-slides';
import { FullscreenSlidesExample } from '../../components/fullscreen-slides/fullscreen-slides.stories';
import { LargeCardCarousel, LargeCardCarouselProps } from '../../components/large-card-carousel/large-card-carousel';
import { DefaultCarousel } from '../../components/large-card-carousel/large-card-carousel.stories';
import { ContentListingBlock, ContentListingBlockProps } from '../../components/content-listing/content-listing-block';
import { ContentCard } from '../../components/content-card/content-card';
import { ContentCardWithImage } from '../../components/content-card/content-card.stories';

const meta: Meta<PropsWithChildren<HomePageProps>> = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Pages/Home Page',
  tags: ['autodocs'],
  component: HomePageComponent,
};

export default meta;
 
type Story = StoryObj<PropsWithChildren<HomePageProps>>;

const ContentListingChildren = [
  <div class="content-card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>,
  <div class="content-card-grid__col"><ContentCard {...ContentCardWithImage.args} /></div>
]

const ContentListingData = {
  theme: 'dark',
  heading: 'Content listing',
  listingPageLink: { label: 'Browse all', url: '#' },
  children: ContentListingChildren
} as PropsWithChildren<ContentListingBlockProps>;

export const Default: Story = {
  render: (args) => HomePageComponent({...args,
    children: [
      FullscreenSlides(FullscreenSlidesExample.args as FullscreenSlideProps),
      QuickLinks(QuickLinksDefault.args as QuickLinksProps),
      FeatureCtaBanner(FeatureCta.args as FeatureCtaBannerProps),
      SmallImageAndText(SmallImageAndTextExample.args as SmallImageAndTextProps),
      LargeCardCarousel(DefaultCarousel.args as LargeCardCarouselProps),
      ContentListingBlock(ContentListingData as ContentListingBlockProps)
    ]
  }),
  args: {
    bimcoHeader: SiteHeader.args,
    bimcoFooter: BimcoSiteFooter.args,
    homePageHeroBanner: HomePage.args as HomePageHeroArgs
  }
} satisfies Story;