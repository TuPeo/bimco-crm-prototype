import * as React from "jsx-dom";

import "./alphabetical-index.scss";

export const AlphabeticalIndex = ({ }) => {
  return (
    <div class="generic-data-listing__index alphabetical-index">
      <a class="alphabetical-index__item">#</a>
      {[...Array(26).keys()].map((n) => {
        const letter = String.fromCharCode(97 + n)
        return (
          <a class="alphabetical-index__item" href={`#index-${letter}`}>{letter}</a>
        )
      }
      )}
    </div>
  )
}