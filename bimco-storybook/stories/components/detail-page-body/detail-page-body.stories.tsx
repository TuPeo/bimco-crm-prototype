import type { StoryObj, Meta } from '@storybook/html';
import { DetailPageBody, DetailPageBodyProps } from './detail-page-body';
import { TextBlockComponent } from "../text-block/text-block";
import { OneColumnTextBlockNoHeadline, TwoColumnTextBlock } from "../text-block/text-block.stories";

const meta = {
  title: 'Components/Text/Detail Page Body',
  tags: ['autodocs'],
  component: DetailPageBody,
  parameters: {
    layout: 'fullscreen'
  }
}satisfies Meta<typeof DetailPageBody>;

export default meta;
type Story = StoryObj<DetailPageBodyProps>;

export const OneRowOfTextBlockContent: Story = {
  render: () => DetailPageBody({children: [
    TextBlockComponent({...TwoColumnTextBlock.args})
  ]})
}

export const TwoRowsOfContent: Story = {
  render: () => DetailPageBody({children: [
    TextBlockComponent({...OneColumnTextBlockNoHeadline.args}),
    TextBlockComponent({...TwoColumnTextBlock.args})
  ]})
}