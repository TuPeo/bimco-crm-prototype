import { Meta, StoryObj } from '@storybook/html';
import { PreviewCard, PreviewCardProps } from './preview-card';

const meta: Meta = {
  title: 'Components/Cards/Preview Card',
  tags: ['autodocs'],
  component: PreviewCard
};

export default meta;
type Story = StoryObj<PreviewCardProps>;

export const BasicPreviewCard = {
  args: {
    title: 'IBIA and BIMCO team up to collaborate on fuel and maritime challenges',
    link: {
      label: 'IBIA and BIMCO team up to collaborate on fuel and maritime challenges',
      url: '#'
    },
    metadata: {
      items: [
        { type: 'date', value: '01 Oct - 05 Oct 2024' },
        { value: 'City, Country', type: 'location', iconStyle: 'solid', iconName: 'location-dot'}
      ],
      contextClass: 'preview-card__metadata'
    }
  }
} satisfies Story;
