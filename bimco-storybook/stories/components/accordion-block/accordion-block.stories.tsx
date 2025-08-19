import * as React from 'jsx-dom';
import { StoryObj, Meta } from '@storybook/html';
import { AccordionBlock, AccordionBlockProps } from './accordion-block';
import { AccordionItem } from '../accordion-item/accordion-item';

const meta = {
  parameters: {
    layout: 'fullscreen'
  },
  title: 'Components/Accordion/Accordion Block',
  tags: ['autodocs'],
  component: AccordionBlock
} satisfies Meta<AccordionBlockProps>;

export default meta;
type Story = StoryObj<AccordionBlockProps>;

const accordionBlock = (args: AccordionBlockProps) => 
  <AccordionBlock {...args}>
    <AccordionItem
      parentId={args.id} 
      id={`${args.id}-0`} 
      collapsed={true}
      title="Accordion Item 1"
      image={{ url: 'media/small-carousel-image.png', alt: ''}}
      ctas={[
        { type: 'primary', label: 'Discover' },
        { type: 'secondary', label: 'Join us' }
      ]}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </p>
    </AccordionItem>
    <AccordionItem
      parentId={args.id} 
      id={`${args.id}-1`}
      collapsed={true}
      title="Accordion Item 2">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </p>
    </AccordionItem>
    <AccordionItem
      parentId={args.id} 
      id={`${args.id}-2`}
      collapsed={true}
      title="Accordion Item 3">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </p>
    </AccordionItem>
  </AccordionBlock>

export const Default = {
  render: (args) => accordionBlock(args),
  args: {
    id: 'accordion-block-default',
    modal: false
  }
} satisfies Story;

export const Modal = {
  render: (args) => accordionBlock(args),
  args: {
    id: 'accordion-block-modal',
    modal: true
  }
} satisfies Story;