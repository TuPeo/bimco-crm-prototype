import * as React from 'jsx-dom';
import type { StoryObj, Meta } from '@storybook/html';
import { AccordionItem, AccordionItemProps } from './accordion-item';

const meta = {
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Components/Accordion/Accordion Item',
  tags: ['autodocs'],
  component: AccordionItem
} satisfies Meta<AccordionItemProps>;

export default meta;
type Story = StoryObj<AccordionItemProps>;

export const Collapsed = {
  render: (args) =>
    <AccordionItem {...args}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </p>
    </AccordionItem>,
    args: {
      parentId: 'accordion-block',
      id: 'accordion-item-0',
      collapsed: true,
      title: 'Accordion Item 1',
      icon: 'anchor',
      image: { url: 'media/small-carousel-image.png', alt: '' },
      ctas: [
        { type: 'primary', label: 'Discover' },
        { type: 'secondary', label: 'Join us' }
      ]
    }
} satisfies Story;

export const Expanded = {
  render: (args) =>
    <AccordionItem {...args}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </p>
    </AccordionItem>,
    args: {
      parentId: 'accordion-block',
      id: 'accordion-item-1',
      collapsed: false,
      title: 'Accordion Item 2',
      icon: 'anchor',
      image: { url: 'media/small-carousel-image.png', alt: '' },
      ctas: [
        { type: 'primary', label: 'Discover' },
        { type: 'secondary', label: 'Join us' }
      ]
    }
} satisfies Story;