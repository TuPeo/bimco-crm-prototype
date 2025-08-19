import * as React from "jsx-dom";
import { Button } from "../../elements/button/button";

import "./chapter-links.scss";

export interface ChapterLinksProps {
  headerSelector: string;
  wrapperSelector: string;
  chapters: string[];
}

export interface ChapterLinkItem {
  label: string;
  id: string;
  index: string;
}

export function chapterLinkItems(chapters: string[]): ChapterLinkItem[] {
  return chapters.map((label, index) => {
    return {
      label: label,
      id: label.toLowerCase().replaceAll(' ', '-'),
      index: (index + 1).toString().padStart(2, '0')
    }
  }); 
}

export const ChapterLinks = ({ headerSelector, wrapperSelector, chapters }: ChapterLinksProps) => {
  return (
    <div 
      class="chapter-links"
      x-load
      x-data={`chapterLinks('${headerSelector}', '${wrapperSelector}')`}>

      <div class="bimco-container bimco-container--inset-xxxl">
        <div class="chapter-links__row row">
          {chapterLinkItems(chapters).map(linkItem => {
            return (
              <div class="col-12 col-md-6 col-lg-3">
                <a class="chapter-links__chapter" href={`#${ linkItem.id }`}>
                  <span class="chapter-links__index">{ linkItem.index }</span>
                  <span class="chapter-links__name">{ linkItem.label }</span>
                </a>
              </div>
            )
          })}
        </div>
      </div>

      <div class="chapter-links__sidebar"
          role="dialog" 
          x-ref="sidebar" 
          x-on:mouseenter="toggleChapterLinks(true)"
          x-on:mouseleave="toggleChapterLinks(false)">

          <button
            type="button"
            class="chapter-links__bars"
            x-on:click="toggleChapterLinks(true)">
            {chapterLinkItems(chapters).map(linkItem => {
              return (
                <span class="chapter-links__bar" id={`chapter-links-bar-${linkItem.id}`}></span>
              )
            })}
          </button>

          <div class="chapter-links__sidebar-chapters" x-ref="sidebarChapters">
            <Button
              type="icon-full"
              contextClass="chapter-links__sidebar-chapters-mobile-close-btn"
              title="Close chapters navigation"
              iconBefore="xmark"
              xOnClick="toggleChapterLinks(false)" />

            {chapterLinkItems(chapters).map(linkItem => {
              return (
                  <a class="chapter-links__chapter" href={`#${ linkItem.id }`}>
                    <span class="chapter-links__index">{ linkItem.index }</span>
                    <span class="chapter-links__name">{ linkItem.label }</span>
                  </a>
              )
            })}
          </div>
      </div>
    </div>
  )
}
