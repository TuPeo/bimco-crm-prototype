import * as React from 'jsx-dom';
import { Meta, StoryObj } from "@storybook/html";
import { RelatedTopics, RelatedTopicsArgs } from "./related-topics";

const meta: Meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/News/Related Topics',
  tags: ['autodocs'],
  component: RelatedTopics
};

export default meta;
type Story = StoryObj<RelatedTopicsArgs>;

export const Base: Story = {
  args: {
    title: "Keep exploring",
    topics: [{
      title: "Press releases",
      count: 72
    },
    {
      title: "Insights",
      count: 48
    },
    {
      title: "Market Analysis",
      count: 32
    }]
  },  
  render: (args) => 
    <div class='theme-zone theme--dark'>
      { RelatedTopics({...args}) }
    </div>
};
