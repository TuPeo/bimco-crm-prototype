import * as React from "jsx-dom";
import { PropsWithChildren } from "jsx-dom";
import { NavigationSwiper } from "../navigation-swiper/navigation-swiper";
import { NavigationLink } from "../../elements/navigation-link/navigation-link";
import { SearchBar } from "../../elements/search-bar/search-bar";

import "./search-menu.scss";
import { RecommendedSearchResult } from "../../elements/recommended-search-result/recommended-search-result";
import { RecommendedSearchResultExample } from "../../elements/recommended-search-result/recommended-search-result.stories";

interface SearchMenuColumnProps {
  heading: string;
  swiperPipLabel: string;
}

const SearchMenuColumn = ({
  heading, 
  swiperPipLabel, 
  children 
}: PropsWithChildren<SearchMenuColumnProps>) => {
  return (
    <div class="search-menu__column col-12 col-md-4" data-swiper-pagination-label={swiperPipLabel}>
      <span class="search-menu__column-heading">{heading}</span>

      {children}
    </div>
  )
}

export const SearchMenuBaseChildren = [
  SearchMenuColumn({ 
    heading: "POPULAR TOPICS",
    swiperPipLabel: "Popular",
    children: [
      NavigationLink({ label: "News", url: "#", type: "sub-page" }),
      NavigationLink({ label: "Events", url: "#", type: "sub-page" }),
      NavigationLink({ label: "Contracts and clauses", url: "#", type: "sub-page" }),
      NavigationLink({ label: "Governance", url: "#", type: "sub-page" }),
      NavigationLink({ label: "Member area", url: "#", type: "sub-page" }),
    ]
  }),
  SearchMenuColumn({ 
  heading: "RECENT SEARCHES",
  swiperPipLabel: "Recent",
    children: [
      NavigationLink({ label: "voyage", url: "#", type: "sub-page" }),
      NavigationLink({ label: "contracts", url: "#", type: "sub-page" }),
      NavigationLink({ label: "BIMCO", url: "#", type: "sub-page" })
    ]
  }),
  SearchMenuColumn({ 
    heading: "PROMOTED CONTENT",
    swiperPipLabel: "Featured",
    children: [
      <h3>Card here</h3>
    ]
  }),
];

export const SearchMenu = ({
  children
}: PropsWithChildren<object>) => {
  return (
    <div class="search-menu" x-load x-data="searchMenu">
      <div class="bimco-container">
        <div class="row justify-content-center">
          <div class="search-menu__search-wrapper col-12 col-lg-6">
            <SearchBar xRef="searchBar" placeholder="Enter your keyword here" inputLabel="Submit" />

            <div class="search-menu__recommended-searches" x-ref="recommendedSearches" x-bind:class="{'search-menu__recommended-searches--show': isSearchInputActive}">
              <RecommendedSearchResult {...RecommendedSearchResultExample.args} />
              <RecommendedSearchResult {...RecommendedSearchResultExample.args} />
              <RecommendedSearchResult {...RecommendedSearchResultExample.args} />
              <RecommendedSearchResult {...RecommendedSearchResultExample.args} />
            </div>
          </div>
        </div>
          <div class="search-menu__swiper-wrapper" x-bind:class="{'search-menu__swiper-wrapper--hidden': isSearchInputActive}">
            <NavigationSwiper contextClass="search-menu__swiper" slideCssClass="search-menu__column">
              {children}
            </NavigationSwiper>
          </div>
        </div>
      </div>

  )
}