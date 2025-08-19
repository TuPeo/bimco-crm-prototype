import * as React from "jsx-dom";
import { LargeCardCta, LargeCardCtaProps } from "./large-card-cta";

export default {
  title: "Elements/Carousels/Large Card Cta",
  component: LargeCardCta,
};

const Template = (args: LargeCardCtaProps) => <LargeCardCta {...args} />;

export const DefaultLargeCardCta = Template.bind({});
DefaultLargeCardCta.args = {
  title: "Start your membership today",
  description:
    "Become a BIMCO member today to access exclusive resources and much more...",
  ctaPrimaryLabel: "Sign up",
  ctaPrimaryUrl: "#",
  ctaSecondaryLabel: "Learn more",
  ctaSecondaryUrl: "#",
};
