import * as React from "jsx-dom";
import {
  GenericDataListingCard,
  GenericDataListingCardProps,
} from "./generic-data-listing-card";

export default {
  title: "Elements/Listings/Generic Data Listing Card",
  component: GenericDataListingCard,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args: GenericDataListingCardProps) => {
  const isFourColumns = !!args.linkText && !!args.linkUrl;
  return (
    <div className={`bimco-container theme-zone theme--white`}>
      <table class={`generic-data-listing__results generic-data-listing__results--${isFourColumns ? 4 : 3}-cols`}>
        <tbody class="generic-data-listing__results-body">
          <GenericDataListingCard {...args} />
        </tbody>
      </table>
    </div>
  );
};

// Three-column variant
export const ThreeColumns = Template.bind({});
ThreeColumns.args = {
  title: "Contract Title",
  description:
    "This is a very long description of the contract, intended to test the truncation effect. The description will include a lot of details to exceed the 3-line limit, ensuring that it gets properly truncated when displayed in the listing. Here, we are simulating a case where the text would span more than three lines, demonstrating how the content is truncated after a certain point.",
  date: "26.07.2024",
  icon: "arrow-up-right-dots",
  iconText: "4hrs ago",
  tag: "Gas",
  tagContextClass: "category-tag--highlight"
};

// Four-column variant
export const FourColumns = Template.bind({});
FourColumns.args = {
  title: "Contract Title",
  description:
    "This is a very long description of the contract, intended to test the truncation effect. The description will include a lot of details to exceed the 3-line limit, ensuring that it gets properly truncated when displayed in the listing. Here, we are simulating a case where the text would span more than three lines, demonstrating how the content is truncated after a certain point.",
  date: "26.07.2024",
  icon: "arrow-up-right-dots",
  iconText: "4hrs ago",
  tag: "Gas",
  tagContextClass: "category-tag--primary",
  linkText: "View Details",
  linkUrl: "#",
  linkIcon: "anchor"
};
