import type { Meta, StoryObj } from "@storybook/html";
import { HelpTooltip } from "./help-tooltip";
import "bootstrap"; // Import Bootstrap JS

// Metadata for Storybook
const meta: Meta<typeof HelpTooltip> = {
  title: "Elements/Alerts/Help Tooltip",
  component: HelpTooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  }
};

export default meta;
type Story = StoryObj<typeof HelpTooltip>;

export const DefaultHelpTooltip: Story = {
  args: {
    message: "This is a helpful tooltip!",
    position: "bottom"
  },
};

export const TopHelpTooltip: Story = {
  args: {
    message: "This tooltip appears above the icon.",
    position: "top",
    backgroundColor: "#004460",
    color: "#ffffff"
  },
};

export const LeftHelpTooltip: Story = {
  args: {
    message: "This tooltip appears to the left of the icon.",
    position: "left",
    backgroundColor: "antiquewhite",
    color: "darkgray"
  },
};

export const RightHelpTooltip: Story = {
  args: {
    message: "This tooltip appears to the right of the icon.",
    position: "right",
    backgroundColor: "#004460",
    color: "#ffffff"
  },
};
