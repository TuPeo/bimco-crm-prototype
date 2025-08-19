import * as React from "jsx-dom";
import { TestimonialCard, TestimonialCardProps } from "./testimonial-card";

export default {
  title: "Elements/Carousels/Testimonial Card",
  component: TestimonialCard,
  argTypes: {
    theme: {
      control: {
        type: "select",
        options: ["blue", "orange", "cyan", "light-blue"],
      },
    },
  },
};

const Template = (args: TestimonialCardProps) => <TestimonialCard {...args} />;

export const BlueTheme = Template.bind({});
BlueTheme.args = {
  imageSrc: "media/Sample_Portrait_01-600x800.jpg", // Update this path to your image
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus, lorem at euismod mollis, mauris ligula ornare nunc, a varius velit massa non dolor , mauris ligula ornare nunc, a varius velit massa non dolo mauris ligula a varius",
  name: "John Doe",
  company: "COSCO Shipping",
  theme: "blue",
};

export const LightBlueTheme = Template.bind({});
LightBlueTheme.args = {
  imageSrc: "media/Sample_Portrait_01-600x800.jpg", // Update this path to your image
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus, lorem at euismod mollis, mauris ligula ornare nunc, a varius velit massa non dolor , mauris ligula ornare nunc, a varius velit massa non dolo mauris ligula a varius",
  name: "John Doe",
  company: "COSCO Shipping",
  theme: "light-blue",
};

export const OrangeTheme = Template.bind({});
OrangeTheme.args = {
  imageSrc: "media/Sample_Portrait_02-600x800.jpg", // Update this path to your image
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus, lorem at euismod mollis, mauris ligula ornare nunc.",
  name: "Jane Smith",
  company: "Global Shipping Inc.",
  theme: "orange",
};

export const TealTheme = Template.bind({});
TealTheme.args = {
  imageSrc: "media/Sample_Portrait_01-600x800.jpg", // Update this path to your image
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus, lorem at euismod mollis, mauris ligula ornare nunc.",
  name: "Michael Johnson",
  company: "Maritime Logistics",
  theme: "cyan",
};
