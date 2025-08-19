import type { Meta, StoryObj } from "@storybook/html";
import { Footnote } from "./footnote";

// Metadata for Storybook
const meta: Meta<typeof Footnote> = {
  title: "Elements/Alerts/Footnote",
  component: Footnote,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Footnote>;

// Basic Footnote Story
export const BasicFootnote: Story = {
  args: {
    content:
      "<p>This is a basic footnote providing extra context or clarification.</p>",
    header: "Footnote Header",
  },
};

// Formatted Footnote Story with a link and bold text
export const FormattedFootnote: Story = {
  args: {
    content:
      '<p>This is a <strong>formatted footnote</strong> with <a href="#">a link</a> for more information.</p>',
    header: "Footnote Header",
  },
};

// Footnote with List Story
export const FootnoteWithList: Story = {
  args: {
    content: `
      <p>Here is a footnote that includes a list of items:</p>
      <ul>
        <li>First item on the list</li>
        <li>Second item on the list</li>
        <li>Third item on the list</li>
      </ul>
    `,
    header: "Footnote Header",
  },
};
