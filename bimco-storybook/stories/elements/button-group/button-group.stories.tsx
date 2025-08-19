import * as React from "jsx-dom";
import type { StoryObj, Meta } from '@storybook/html';
import { ButtonGroup, ButtonGroupProps } from './button-group';
import { Button } from "../button/button";

const meta = {
  title: 'Elements/Buttons/Button Group',
  tags: ['autodocs'],
  component: ButtonGroup
} satisfies Meta<ButtonGroupProps>;

export default meta;
type Story = StoryObj<ButtonGroupProps>;

export const ButtonGroupTwoButtons: Story = {
  render: () =>
    <ButtonGroup>
      <Button type="primary" />
      <Button type="secondary" />
    </ButtonGroup>
};

export const ButtonGroupThreeButtons: Story = {
  render: () =>
    <ButtonGroup>
      <Button type="primary" />
      <Button type="secondary" />
      <Button type="link" />
    </ButtonGroup>
};