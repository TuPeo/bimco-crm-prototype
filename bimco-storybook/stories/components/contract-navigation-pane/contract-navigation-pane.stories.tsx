import { Meta, StoryObj } from "@storybook/html";
import {
  ContractNavigationPane,
  ContractNavigationPaneProps,
} from "./contract-navigation-pane";
import LinkArgs from "../../types/link-args";

const meta: Meta<ContractNavigationPaneProps> = {
  title: "Components/Contracts Navigation/Contract Navigation Pane",
  component: ContractNavigationPane,
  argTypes: {
    centerLink: {
      control: "object",
      defaultValue: { label: "ALL CONTRACTS", url: "#" },
    },
    previousLink: {
      control: "object",
      defaultValue: {
        label: "Previous contract name",
        url: "#",
      } as LinkArgs,
    },
    nextLink: {
      control: "object",
      defaultValue: {
        label: "Next contract name",
        url: "#",
      } as LinkArgs,
    },
  },
};

export default meta;

type Story = StoryObj<ContractNavigationPaneProps>;

export const Default: Story = {
  args: {
    centerLink: { label: "ALL CONTRACTS", url: "#" },
    previousLink: { label: "Previous contract name", url: "#" },
    nextLink: { label: "Next contract name", url: "#" },
  },
};
