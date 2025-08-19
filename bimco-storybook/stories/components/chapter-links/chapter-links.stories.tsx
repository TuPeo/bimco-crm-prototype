import * as React from "jsx-dom";
import type { Meta, StoryObj } from "@storybook/html";
import { ChapterLinks, ChapterLinksProps, chapterLinkItems } from "./chapter-links";

import "./chapter-links-section.preview.scss";

// Metadata for Storybook
const meta: Meta<ChapterLinksProps> = {
  title: "Components/Navigation/Chapter Links",
  component: ChapterLinks,
  tags: ["autodocs"],
  args: {
    headerSelector: "#custom-root",
    wrapperSelector: "#storybook-root",
    chapters: [
      "Chapter 1",
      "Chapter 2 with extra long name here extra long name here extra long name here",
      "Chapter 3",
      "Chapter 4",
      "Chapter 5",
      "Chapter 6",
      "Chapter 7",
      "Chapter 8",
    ]
  },
  parameters: {
    layout: "fullscreen",
  }
};

export default meta;
type Story = StoryObj<ChapterLinksProps>;

export const DefaultChapterLinks: Story = {}

export const LongformChapterLinks: Story = {
  args: {
    headerSelector: "#custom-root",
    wrapperSelector: "#storybook-root",
    chapters: [
      "Name of chapter 1 goes here",
      "Name of chapter 2 goes here",
      "Name of chapter 3 goes here",
      "Name of chapter 4 goes here",
      "Name of chapter 5 goes here",
      "Name of chapter 6 goes here",
      "Name of chapter 7 goes here",
      "Name of chapter 8 goes here"
    ]
  },
  render: (args) => (
    <>
      <ChapterLinks {...args} />
      
      {/* Demonstration purposes only */}
      <div class="bimco-container">
        {chapterLinkItems(args.chapters).map(linkItem => (
          <div id={linkItem.id} class="chapter-links-section" data-chapter-link>
            <h2>{linkItem.label}</h2>
            <p>{linkItem.label} content...</p>
          </div>
        ))}
      </div>
    </>
  )
}

export const ChapterLinksWithContent = {
  render: (args) => (
    <>
      <ChapterLinks {...args} />

      {/* Demonstration purposes only */}
      <div class="bimco-container">
        {chapterLinkItems(args.chapters).map(linkItem => (
          <div id={linkItem.id} class="chapter-links-section" data-chapter-link>
            <h2>{linkItem.label}</h2>
            <p>{linkItem.label} content...</p>
          </div>
        ))}
      </div>
    </>
  )
} satisfies Story;
