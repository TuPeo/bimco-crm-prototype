import * as React from "jsx-dom";
import { Meta, StoryObj } from "@storybook/html";
import { BimcoModal, BimcoModalProps } from "./bimco-modal";

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Global/Bimco Modal',
  tags: ['autodocs'],
  component: BimcoModal
} satisfies Meta<BimcoModalProps>;

export default meta;
type Story = StoryObj<BimcoModalProps>;

export const Example: Story = {
  render: (args) =>
  (
    <>
      <button type="button" data-bs-toggle="modal" data-bs-target={`#${args.id}`}>
        Open Modal
      </button>
      {BimcoModal({
        ...args,
        children: [
          <h2>
            Example Modal
          </h2>,
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt molestie lectus.
            Aenean commodo mattis metus, et hendrerit nisi consequat eu. Vestibulum lobortis,
            ipsum eget eleifend finibus, diam mi molestie elit, sed laoreet tellus metus eu orci.
            Praesent vel nibh vitae orci rutrum faucibus. Nullam leo mi, eleifend ut tristique vel,
            pharetra venenatis nunc. Sed sit amet ex pulvinar, congue leo et, interdum risus.
            Sed dignissim scelerisque nulla sit amet malesuada. Duis neque diam, suscipit quis magna id,
            laoreet eleifend nibh. Sed eget laoreet nisi. Quisque nec consequat nibh, lobortis auctor orci.
            Integer consectetur nisi interdum maximus condimentum. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nulla a augue rhoncus, condimentum risus vel, fermentum nunc.
            Integer convallis, tellus ut bibendum pharetra, tellus diam rhoncus nisi,
            eget maximus lorem erat vel ligula.
          </p>
        ]
      })}
    </>
  ),
  args: {
    id: "exampleModal"
  }
};
