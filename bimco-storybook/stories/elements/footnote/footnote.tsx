import * as React from "jsx-dom";
import "./footnote.scss";

export interface FootnoteProps {
  header: string; // The header for the footnote
  content: string; // Fill the footnote content from rich text
}

export const Footnote = ({ header, content }: FootnoteProps) => {
  return (
    <div class="footnote">
      <div class="bimco-container footnote__container">
        <div class="row justify-content-start align-items-start footnote__row">
          <div class="col-auto footnote__icon-column">
            <i
              class="footnote__fa-circle-info fa-sharp fa-solid fa-circle-info"
              aria-hidden="true"
            />
          </div>
          <div class="col">
            <h4 class="footnote__header">{header}</h4>
            <div
              class="footnote__content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
