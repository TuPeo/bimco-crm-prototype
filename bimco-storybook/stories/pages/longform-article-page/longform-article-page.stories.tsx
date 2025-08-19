import type { StoryObj, Meta } from '@storybook/html';
import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";
import { LongformArticlePage, LongformArticlePageProps } from "./longform-article-page";
import { SiteHeaderWithScrollIndicator } from '../../components/bimco-header/bimco-header.stories';
import { BimcoSiteFooter } from '../../components/bimco-footer/bimco-footer.stories';
import { Longform } from '../../components/longform-article-hero/longform-article-hero.stories';
import { LongformChapterLinks } from '../../components/chapter-links/chapter-links.stories';
import { TextBlockComponent, TextBlockComponentProps } from '../../components/text-block/text-block';
import { TwoColumnTextBlock } from '../../components/text-block/text-block.stories';
import { ChapterLinksProps } from '../../components/chapter-links/chapter-links';
import { SmallImageAndText, SmallImageAndTextProps } from '../../components/small-image-and-text/small-image-and-text';
import { SmallImageAndTextWithBackgroundVideo } from '../../components/small-image-and-text/small-image-and-text.stories';

const meta: Meta<PropsWithChildren<LongformArticlePageProps>> = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Pages/Longform Article Page',
  tags: ['autodocs'],
  component: LongformArticlePage,
};

export default meta;
type Story = StoryObj<PropsWithChildren<LongformArticlePageProps>>;

export const Default: Story = {
  render: (args) => LongformArticlePage({...args,
    children: [
      <div id="chapter-link-0">
        { TextBlockComponent(TwoColumnTextBlock.args as TextBlockComponentProps) }
      </div>,
      <div id="chapter-link-1">
        { SmallImageAndText(SmallImageAndTextWithBackgroundVideo.args as SmallImageAndTextProps) }
      </div>    
    ]
  }),
  args: {
    bimcoHeader: SiteHeaderWithScrollIndicator.args,
    bimcoFooter: BimcoSiteFooter.args,
    longformArticleHero: Longform.args,
    chapterLinks: LongformChapterLinks.args as ChapterLinksProps
  }
} satisfies Story;
